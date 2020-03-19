import { Router } from 'express';

import * as mainController from '../controllers/main.controller';
import * as miscController from '../controllers/misc.controller';
import * as PrototypeAuth from '../middlewares/authentication';
//
import * as demosController from '../controllers/ufs';

import { isDevelopment } from '../config/constants';

const router = Router();

/* Mount Authorisation to all prototype paths when in Prod.
   Requires credentials to match those in in Heroku env settings
*/
if (!isDevelopment()) {
  router.get('/prototypes*', PrototypeAuth.authenticationMiddleware);
}

// Misc routes
router.get('/robots.txt', mainController.robots);
router.get('/', mainController.index);

// API Routes
// router.post('/api/v1/recalls', recallsController.recalls);

/* *************************************************************** *

    UFS ROUTES AND CONTROLLERS

 * *************************************************************** */

// Tiny MCE demo Introducer stuff (this is the noddy journey with the 0-10 scoring drop down)
router.get('/prototypes/example-journey/introducer', demosController.tinyMCEGet);
router.post('/prototypes/example-journey/introducer', demosController.tinyMCEPost);
router.get('/prototypes/example-journey/introducer/view', demosController.tinyMCEViewGet);

// Tiny MCE demo case for support
router.get('/prototypes/example-journey/application', demosController.tinyMCEApplicationIndexGet);
router.get('/prototypes/example-journey/application/start', demosController.tinyMCEApplicationGet);
router.post('/prototypes/example-journey/application/start', demosController.tinyMCEApplicationPost);

router.get('/prototypes/example-journey/application/case-for-support', demosController.caseForSupportGet);
router.post('/prototypes/example-journey/application/case-for-support', demosController.caseForSupportPost);

router.get('/prototypes/example-journey/application/view', demosController.tinyMCEApplicationViewGet);
router.get('/prototypes/example-journey/application/view-static', demosController.tinyMCEApplicationStaticViewGet);

// Application journey
router.get('/prototypes/example-journey/application/application-team', demosController.applicationTeamGet);
router.post('/prototypes/example-journey/application/application-team', demosController.applicationTeamPost);
router.get('/prototypes/example-journey/application/capability-to-deliver', demosController.capabilityToDeliverGet);
router.post('/prototypes/example-journey/application/capability-to-deliver', demosController.capabilityToDeliverPost);
router.get('/prototypes/example-journey/application/ethical-and-societal-issues', demosController.ethicalSocietalGet);
router.post('/prototypes/example-journey/application/ethical-and-societal-issues', demosController.ethicalSocietalPost);
router.get('/prototypes/example-journey/application/project-details', demosController.projectDetailsGet);
router.post('/prototypes/example-journey/application/project-details', demosController.projectDetailsPost);
router.get('/prototypes/example-journey/application/resources-and-cost', demosController.resourcesCostGet);
router.post('/prototypes/example-journey/application/resources-and-cost', demosController.resourcesCostPost);

// spreadsheet
router.get('/prototypes/example-journey/application/spreadsheet', demosController.spreadSheetGet);
router.post('/prototypes/example-journey/application/spreadsheet', demosController.spreadSheetPost);

// data from google docs
router.get('/prototypes/gds/data-from-docs', demosController.dataTestGet);
router.post('/prototypes/gds/data-from-docs', demosController.dataTestPost);

// upload script
router.get('/prototypes/uploadStuff', demosController.uploadStuffGet);
router.post('/prototypes/uploadStuff', demosController.uploadStuffPost);

// JWT
router.get('/prototypes/jwt', demosController.JWTGet);
router.post('/prototypes/jwt', demosController.JWTPost);

// Embedded PDF
router.get('/prototypes/example-journey/embedded-pdf', demosController.embeddedPDFGet);
router.post('/prototypes/example-journey/embedded-pdf', demosController.embeddedPDFPost);
router.get('/prototypes/example-journey/embedded-pdf/view', demosController.embeddedPDFViewGet);

router.get('/prototypes/example-journey/embedded-pdf/start', demosController.embeddedPDFStartGet);
router.post('/prototypes/example-journey/embedded-pdf/start', demosController.embeddedPDFStartPost);
// router.get('/prototypes/example-journey/embedded-pdf/start-uploaded', demosController.embeddedPDFStartGet);
// router.post('/prototypes/example-journey/embedded-pdf/start-uploaded', demosController.embeddedPDFStartPost);
router.get('/prototypes/example-journey/embedded-pdf/view-pdf', demosController.embeddedPDFViewPDFGet);

// Create new opportunity
router.get('/prototypes/opportunity/', demosController.opportunityGet);
router.get('/prototypes/opportunity/create', demosController.createOpportunityGet);
router.post('/prototypes/opportunity/create', demosController.createOpportunityPost);
router.get('/prototypes/opportunity/setup', demosController.opportunitySetupGet);
router.post('/prototypes/opportunity/setup', demosController.opportunitySetupPost);
router.get('/prototypes/opportunity/funders', demosController.opportunityFundersGet);
router.post('/prototypes/opportunity/funders', demosController.opportunityFundersPost);
router.get('/prototypes/opportunity/application', demosController.opportunityApplicationGet);
router.post('/prototypes/opportunity/application', demosController.opportunityApplicationPost);

/* *************************************************************** *

    Molecules random stuff

 * *************************************************************** */
// filters
router.get('/prototypes/molecules/filters', demosController.moleculesFiltersGet);

/* *************************************************************** *

    Create opportunity V2

 * *************************************************************** */
// Create new opportunity
router.get('/prototypes/opportunity-v2/', demosController.opportunityGetV2);
router.get('/prototypes/opportunity-v2/create', demosController.createOpportunityGetV2);
router.post('/prototypes/opportunity-v2/create', demosController.createOpportunityPostV2);
router.get('/prototypes/opportunity-v2/setup', demosController.opportunitySetupGetV2);
router.post('/prototypes/opportunity-v2/setup', demosController.opportunitySetupPostV2);
router.get('/prototypes/opportunity-v2/funders', demosController.opportunityFundersGetV2);
router.post('/prototypes/opportunity-v2/funders', demosController.opportunityFundersPostV2);
router.get('/prototypes/opportunity-v2/application', demosController.opportunityApplicationGetV2);
router.post('/prototypes/opportunity-v2/application', demosController.opportunityApplicationPostV2);
router.get('/prototypes/opportunity-v2/applicants', demosController.opportunityApplicantsGetV2);
router.post('/prototypes/opportunity-v2/applicants', demosController.opportunityApplicantsPostV2);
router.get('/prototypes/opportunity-v2/workflow-application', demosController.opportunityWorkflowApplicationGetV2);
router.post('/prototypes/opportunity-v2/workflow-application', demosController.opportunityWorkflowApplicationPostV2);
router.get('/prototypes/opportunity-v2/resources-and-costs', demosController.opportunityResourcesGetV2);
router.post('/prototypes/opportunity-v2/resources-and-costs', demosController.opportunityResourcesPostV2);
router.get('/prototypes/opportunity-v2/application-dates', demosController.opportunityApplicationsDatesGetV2);
router.post('/prototypes/opportunity-v2/application-dates', demosController.opportunityApplicationsDatesPostV2);
router.get('/prototypes/opportunity-v2/details', demosController.opportunityDetailsGetV2);
router.post('/prototypes/opportunity-v2/details', demosController.opportunityDetailsPostV2);
router.get('/prototypes/opportunity-v2/custom-section', demosController.opportunityCustomSectionGetV2);
router.post('/prototypes/opportunity-v2/custom-section', demosController.opportunityCustomSectionPostV2);

/* *************************************************************** *

    Create opportunity V3

 * *************************************************************** */
// Create new opportunity
router.get('/prototypes/opportunity-v3/', demosController.opportunityGetV3);
router.get('/prototypes/opportunity-v3/config', demosController.createOpportunityConfigGetV3);
router.post('/prototypes/opportunity-v3/config', demosController.createOpportunityConfigPostV3);
router.get('/prototypes/opportunity-v3/create', demosController.createOpportunityGetV3);
router.post('/prototypes/opportunity-v3/create', demosController.createOpportunityPostV3);
router.get('/prototypes/opportunity-v3/setup', demosController.opportunitySetupGetV3);
router.post('/prototypes/opportunity-v3/setup', demosController.opportunitySetupPostV3);
router.get('/prototypes/opportunity-v3/funders', demosController.opportunityFundersGetV3);
router.post('/prototypes/opportunity-v3/funders', demosController.opportunityFundersPostV3);
router.get('/prototypes/opportunity-v3/application', demosController.opportunityApplicationGetV3);
router.post('/prototypes/opportunity-v3/application', demosController.opportunityApplicationPostV3);
router.get('/prototypes/opportunity-v3/applicants', demosController.opportunityApplicantsGetV3);
router.post('/prototypes/opportunity-v3/applicants', demosController.opportunityApplicantsPostV3);
router.get('/prototypes/opportunity-v3/workflow-application', demosController.opportunityWorkflowApplicationGetV3);
router.post('/prototypes/opportunity-v3/workflow-application', demosController.opportunityWorkflowApplicationPostV3);
router.get('/prototypes/opportunity-v3/resources-and-costs', demosController.opportunityResourcesGetV3);
router.post('/prototypes/opportunity-v3/resources-and-costs', demosController.opportunityResourcesPostV3);
router.get('/prototypes/opportunity-v3/application-dates', demosController.opportunityApplicationsDatesGetV3);
router.post('/prototypes/opportunity-v3/application-dates', demosController.opportunityApplicationsDatesPostV3);
router.get('/prototypes/opportunity-v3/details', demosController.opportunityDetailsGetV3);
router.post('/prototypes/opportunity-v3/details', demosController.opportunityDetailsPostV3);
router.get('/prototypes/opportunity-v3/custom-section', demosController.opportunityCustomSectionGetV3);
router.post('/prototypes/opportunity-v3/custom-section', demosController.opportunityCustomSectionPostV3);
router.get('/prototypes/opportunity-v3/setup-complete', demosController.opportunitySetupCompleteGetV3);
router.post('/prototypes/opportunity-v3/setup-complete', demosController.opportunitySetupCompletePostV3);

/* *************************************************************** *

Register  V1

* *************************************************************** */
router.get('/prototypes/register-v1/start', demosController.registerStartGetV1);
router.post('/prototypes/register-v1/start', demosController.registerStartPostV1);
router.get('/prototypes/register-v1/organisation', demosController.orgsGetV1);
router.post('/prototypes/register-v1/organisation', demosController.orgsPostV1);
router.get('/prototypes/register-v1/confirm-organisation', demosController.orgsConfirmGetV1);
router.post('/prototypes/register-v1/confirm-organisation', demosController.orgsConfirmPostV1);
router.get('/prototypes/register-v1/details', demosController.detailsGetV1);
router.post('/prototypes/register-v1/details', demosController.detailsPostV1);
router.get('/prototypes/emails/', demosController.emailsGet);
router.post('/prototypes/emails/', demosController.emailsPost);

// Create route from view path
router.get('*', miscController.viewFileRoute);

export const allRoutes = router;
