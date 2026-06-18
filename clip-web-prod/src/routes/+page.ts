import type { PageLoad } from "./$types";
import type {RootContent } from "../../../shared/types/RootContent"

export const load:PageLoad = async ({ fetch }) => {
	const response = await fetch('/data/root-content.json');

	if (!response.ok) {
		throw new Error('Failed to load root content');
	}

	return (await response.json()) as RootContent;

};