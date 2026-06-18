import type { PageLoad } from "./$types";
import type {RootContent } from "../../../shared/types/RootContent"
import rootContentData from '$lib/data/root-content.json'
import { error } from "@sveltejs/kit";

const fallbackContent = rootContentData as unknown as RootContent

export const load: PageLoad = async ({fetch}) => {
  if (import.meta.env.VITE_IS_MOCK === 'true') {
    return fallbackContent
  }

  try {
		const res = await fetch('/data/root-content.json');

		if (!res.ok) {
			throw error(500, 'Content failed to load');
		}

		return (await res.json()) as RootContent;
	} catch (err) {
		throw error(500, `Content failed to load ${err}`);
	}
}