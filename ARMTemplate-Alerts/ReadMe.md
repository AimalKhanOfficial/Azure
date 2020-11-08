# Steps to create the Azure Alert Metric using ARM/AzurePowerShell
- Connect-AzAccount
- Select-AzSubscription -SubscriptionName <subscriptionID>
- New-AzResourceGroupDeployment -Name AlertDeployment -ResourceGroupName Aimal-Test-RG -TemplateFile ./simplestaticmetricalert.json -TemplateParameterFile ./simplestaticmetricalert.parameters.json

Source: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-metric-create-templates