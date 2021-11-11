import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../src/components/Layout";
import NewEntry from "../../../src/components/NewEntry";
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getFoodById, updateFoodById } from "../../../src/clientApi/admin/food";
import { useCallback } from "react";
import { Food } from "../../../src/api/food";
import { withAdminPermission } from "../../../src/components/withAdminPermission";

const foodMutator = (data: Food) => updateFoodById(data.id || 'zbyelefetezk', data);

const Edit: NextPage = () => {
  const router = useRouter();
  const { foodId } = router.query;

  const queryClient = useQueryClient();

  const fetchFoodData = useCallback(() => getFoodById(typeof foodId === 'string' ? foodId : ''), [foodId]);
  const { isLoading, data } = useQuery(`admin/foodEntry/${foodId}`, fetchFoodData);

  const editEntryMutation = useMutation(foodMutator, {
    onSuccess(_data, food) {
      queryClient.invalidateQueries(`admin/foodEntry/${food.id}`);
      queryClient.invalidateQueries('foodEntries');
      router.back();
    }
  })

  const handleAddFoodEntry = (foodName: string, calorieCount: string, dateValue: Date) => {
    editEntryMutation.mutate({
      id: typeof foodId === 'string' ? foodId : '',
      name: foodName,
      calories: +calorieCount,
      consumedAt: dateValue,
    });
  }

  return (
    <div className={styles.container}>
      <Layout>
        {data && (
          <NewEntry
            foodId={foodId}
            dateValue={data.consumedAt}
            foodName={data.name}
            calorieCount={'' + data.calories}
            handleAddFoodEntry={handleAddFoodEntry}
          />
        )}
      </Layout>
    </div>
  );
};

export default withAdminPermission(Edit);
