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
export class IsEntityExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, column] = args.constraints;
    const repository: Repository<any> =
      this.dataSource.getRepository(EntityClass);

    const exists = await repository.findOneBy({ [column]: value });
    return !!exists; // Returns true if the entity exists
  }

  defaultMessage(args: ValidationArguments): string {
    const [EntityClass, column] = args.constraints;
    return `${column} does not exist in ${EntityClass.name}`;
  }
}

export function IsEntityExists(
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
      validator: IsEntityExistsConstraint,
    });
  };
}
