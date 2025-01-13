import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, column] = args.constraints;
    const repository: Repository<any> =
      this.dataSource.getRepository(EntityClass);

    const existingEntity = await repository.findOneBy({ [column]: value });
    return !existingEntity; // Return true if no entity exists (i.e., value is unique)
  }

  defaultMessage(args: ValidationArguments): string {
    const [EntityClass, column] = args.constraints;
    return `${column} must be unique in ${EntityClass.name}`;
  }
}

export function IsUnique(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  entity: Function,
  column: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: IsUniqueConstraint,
    });
  };
}
