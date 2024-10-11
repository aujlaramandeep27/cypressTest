import { startDevServer } from '@cypress/webpack-dev-server';
import webpackConfig from '../../webpack.config';

export default (on: any, config: any) => {
  on('dev-server:start', (options) => {
    return startDevServer({ options, webpackConfig });
  });
};
