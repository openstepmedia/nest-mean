import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * @see https://docs.nestjs.com/pipes
 */
@Injectable()
export class ToBooleanPipe implements PipeTransform {
    /**
     * For a given value, return true/false or null
     * @param value
     * @param param1
     */
    transform(value: any, { type, metatype }: ArgumentMetadata) {
        if (type === 'query' && metatype === Boolean) {
            return value ? value === 'true' : null;
        }

        return value;
    }
}
