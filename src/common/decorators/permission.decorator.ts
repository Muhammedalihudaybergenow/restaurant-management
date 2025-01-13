import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, PermissionGuard } from '../../authentications/guards';
import { UserRoleEnum } from '../enums';

export const Permissions = (...permissions: UserRoleEnum[]) => {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
    ApiBearerAuth('JWT-auth'),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
    ApiUnauthorizedResponse({
      description: `${permissions}`,
    }),
  );
};
