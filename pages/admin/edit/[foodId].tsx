import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../src/components/Layout";
import NewEntry from "../../../src/components/NewEntry";
import { useRouter } from 'next/router'

const Edit: NextPage = () => {
  const router = useRouter();
  const { foodId } = router.query;

  return (
    <div className={styles.container}>
      <Layout>
        <NewEntry foodId={foodId} />
      </Layout>
    </div>
  );
};

export default Edit;
