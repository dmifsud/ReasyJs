import { BaseUrl, ReasyService } from '../../../core';

import { ApplianceModel } from './appliance.model';
import { ReasyDataItem, ReasyDataCollection } from '../../../lib/services/reasy.data.service';
import { ReasyItem } from '../../../lib/services/reasy.decorators';

class ApplianceReasyServiceItem extends ReasyDataItem<ApplianceModel> {}

@BaseUrl('appliances')
@ReasyItem(ApplianceReasyServiceItem)
export class ApplianceReasyService extends ReasyDataCollection<ApplianceModel, ApplianceReasyServiceItem> {}