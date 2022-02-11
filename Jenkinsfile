@Library('Pipeline@develop')

import com.mastercard.labs.*
import com.mastercard.labs.plans.*

ci(new AngularBuildPlan([
   imChannel: "#ezaccess"]),
   [new HelmChartPlan([
     org: OrgEnum.LABS,
     region: RegionEnum.AMERICA,
     cloud: CloudEnum.AKS,
     infraSku: "eza",
     host: 'ascenda-test',
     ingress: true])])
