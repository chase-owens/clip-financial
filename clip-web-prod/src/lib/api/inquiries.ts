import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { InquiryBase } from '../../../../shared/types/Inquiry';

export const createInquiry = async (inquiry: InquiryBase) => {
	const response = await fetch(`${PUBLIC_API_BASE_URL}/inquiries`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(inquiry)
	});

	if (!response.ok) {
		error(500, 'create inquiry error');
	}

	return response.json();
};
