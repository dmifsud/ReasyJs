import { BaseUrl, ReasyItem, ReasyService } from '../../../core';

import { ApplianceModel } from './appliance.model';

class ApplianceReasyServiceItem extends ReasyItem<ApplianceModel> {}

@BaseUrl('appliances')
export class ApplianceReasyService extends ReasyService<ApplianceModel, ApplianceReasyServiceItem> {}