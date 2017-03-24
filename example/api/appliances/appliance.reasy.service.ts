import { BaseUrl, ReasyDataItem, ReasyDataCollection, ReasyItem } from '../../../core';

import { ApplianceModel } from './appliance.model';

class ApplianceReasyServiceItem extends ReasyDataItem<ApplianceModel> {}

@BaseUrl('appliances')
@ReasyItem(ApplianceReasyServiceItem)
export class ApplianceReasyService extends ReasyDataCollection<ApplianceModel, ApplianceReasyServiceItem> {}