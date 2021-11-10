import prismaClient from '../../prisma/client';
import AuthorizationError from '../utils/errors/AuthorizationError';

const baseUrl = 'https://api.nutritionix.com/v1_1/search';

export type FoodCalorie = {
  id: string;
  name: string;
  calories: number;
};

interface NutritionixSearchHitFields {
  item_name: string;
  nf_calories: number;
  nf_serving_size_qty: number;
  nf_serving_size_unit: string;
}

interface NutritionixSearchHit {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  fields: NutritionixSearchHitFields;
}

interface NutritionixSearchResult {
  total_hits: number;
  max_score: number;
  hits: NutritionixSearchHit[];
}

export async function searchFood(query: string): Promise<FoodCalorie[]> {
  const appId = process.env.NUTRITIONIX_APP_ID;
  const appKey = process.env.NUTRITIONIX_APP_KEY;
  const url = `${baseUrl}/${encodeURIComponent(query)}?fields=item_name,nf_calories&appId=${appId}&appKey=${appKey}`;
  const response = await fetch(url);
  const result = await response.json() as NutritionixSearchResult;
  return result.hits.map(hit => ({
    id: hit._id,
    name: hit.fields.item_name,
    calories: hit.fields.nf_calories,
  }));
}
