import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

import { ENV_KEYS } from './env.config';
import { AnyObject } from 'src/types/shared';

const getMongoUri = (configService: ConfigService) => configService.get<string>(ENV_KEYS.mongodbUrl);

export const getMongoConfig = async (
  configService: ConfigService,
  options: AnyObject,
): Promise<MongooseModuleOptions> => ({
  uri: getMongoUri(configService),
  ...options,
});
