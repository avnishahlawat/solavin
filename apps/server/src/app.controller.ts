import { Controller, Get } from '@nestjs/common';
import { PRESET_THEMES } from '@solavin/shared';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'SOLAVIN Server',
      timestamp: new Date().toISOString()
    };
  }

  @Get('api/themes')
  getThemes() {
    return PRESET_THEMES;
  }
}
