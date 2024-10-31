import { EntityTarget } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ParsedQs } from 'qs';

const getCorrectRelations = (
    entity: EntityTarget<any>,
    appends: string | string[] | ParsedQs | ParsedQs[] | undefined
): string[] => {
    const entityRelations = AppDataSource.getMetadata(entity).relations.map((relation) => relation.propertyName);

    const appendsArray = Array.isArray(appends) ? 
        appends.filter((append) : 
        append is string => typeof append === 'string') : 
        typeof appends === 'string' ? [appends] : [];

    return appendsArray.filter((append) => entityRelations.includes(append));
};

export { getCorrectRelations };
