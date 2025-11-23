import { appwriteConfig } from '$lib/server/appwriteConfig';
import { serverClient } from '$lib/server/appwrite';
import { ID, Query, TablesDB } from 'node-appwrite';

export const tablesDB = new TablesDB(serverClient);

export async function getDatabase(options: { id?: string }) {
	try {
		return await tablesDB.get({ databaseId: options.id || appwriteConfig.databases.main.id });
	} catch (error) {
		console.error('Error fetching database:', error);
		throw error;
	}
}

export async function getRow(options: {
	tableId: string;
	rowId: string;
	queries?: string[];
	databaseId?: string;
}) {
	const dbId = options.databaseId ?? appwriteConfig.databases.main.id;
	const queries = options.queries ?? [];

	try {
		const result = await tablesDB.getRow({
			databaseId: dbId,
			tableId: options.tableId,
			rowId: options.rowId,
			queries: queries as unknown as string[]
		});
		if (!result) {
			throw new Error('Row not found');
		}
		return result;
	} catch (error) {
		console.error(`Error fetching row ${options.rowId} from table ${options.tableId}:`, error);
		throw error;
	}
}

export async function listRows(options: {
	tableId: string;
	queries?: string[];
	databaseId?: string;
}) {
	const dbId = options.databaseId ?? appwriteConfig.databases.main.id;
	const queries = options.queries ?? [];

	try {
		const result = await tablesDB.listRows({
			databaseId: dbId,
			tableId: options.tableId,
			queries: queries as unknown as string[]
		});
		return result.rows;
	} catch (error) {
		console.error(`Error listing rows from table ${options.tableId}:`, error);
		throw error;
	}
}

export async function getFirstRow(options: {
	tableId: string;
	queries?: string[];
	databaseId?: string;
}) {
	const dbId = options.databaseId ?? appwriteConfig.databases.main.id;
	const queries = [...(options.queries ?? []), Query.limit(1)]; // Limit to 1 row

	try {
		const result = await tablesDB.listRows({
			databaseId: dbId,
			tableId: options.tableId,
			queries: queries as unknown as string[]
		});
		if (result.total === 0) {
			throw new Error('document_not_found');
		}
		return result.rows[0];
	} catch (error) {
		console.error(`Error fetching first row from table ${options.tableId}:`, error);
		throw error;
	}
}

export async function createRow(options: {
	tableId: string;
	data: object;
	rowId?: string;
	databaseId?: string;
}) {
	const dbId = options.databaseId ?? appwriteConfig.databases.main.id;

	try {
		return await tablesDB.createRow({
			databaseId: dbId,
			tableId: options.tableId,
			rowId: options.rowId ?? ID.unique(),
			data: options.data
		});
	} catch (error) {
		console.error(`Error creating row in table ${options.tableId}:`, error);
		throw error;
	}
}

export async function updateRow(options: {
	tableId: string;
	rowId: string;
	data: object;
	databaseId?: string;
}) {
	const dbId = options.databaseId ?? appwriteConfig.databases.main.id;

	try {
		return await tablesDB.updateRow({
			databaseId: dbId,
			tableId: options.tableId,
			rowId: options.rowId,
			data: options.data
		});
	} catch (error) {
		console.error(`Error updating row ${options.rowId} in table ${options.tableId}:`, error);
		throw error;
	}
}

export async function incrementRowColumn(options: {
	tableId: string;
	rowId: string;
	column: string;
	increment: number;
	max?: number;
	databaseId?: string;
}) {
	const dbId = options.databaseId ?? appwriteConfig.databases.main.id;

	try {
		return await tablesDB.incrementRowColumn({
			databaseId: dbId,
			tableId: options.tableId,
			rowId: options.rowId,
			column: options.column,
			value: options.increment,
			max: options.max
		});
	} catch (error) {
		console.error(
			`Error incrementing column ${options.column} in row ${options.rowId} of table ${options.tableId}:`,
			error
		);
		throw error;
	}
}
export async function decrementRowColumn(options: {
	tableId: string;
	rowId: string;
	column: string;
	decrement: number;
	min?: number;
	databaseId?: string;
}) {
	const dbId = options.databaseId ?? appwriteConfig.databases.main.id;

	try {
		return await tablesDB.decrementRowColumn({
			databaseId: dbId,
			tableId: options.tableId,
			rowId: options.rowId,
			column: options.column,
			value: options.decrement,
			min: options.min
		});
	} catch (error) {
		console.error(
			`Error decrementing column ${options.column} in row ${options.rowId} of table ${options.tableId}:`,
			error
		);
		throw error;
	}
}
