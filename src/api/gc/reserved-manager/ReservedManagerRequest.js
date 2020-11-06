import ReservedManagerRequestHeader from './ReservedManagerRequestHeader';
import ReservedManagerRequestBody from './ReservedManagerRequestBody';
import {UrlConstant} from '../../const/ConstDefine';
import MessageUtils from '../../utils/MessageUtils';
import Request from '../../Request';
import { object } from 'prop-types';

export default class ReservedManagerRequest {

    static sendGetMaterialLot = (object) => {
        let requestBody = ReservedManagerRequestBody.buildGetMaterialLot(object.docLineRrn, object.tableRrn);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetMaterialLotAndUserByRrnRequest = (object) => {
        let requestBody = ReservedManagerRequestBody.buildGetMaterialLotAndUser(object.tableRrn,object.whereClause);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendReserved= (object) => {
        let requestBody = ReservedManagerRequestBody.buildReserved(object.docLineRrn, object.materialLots, object.stockNote);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetPackageDetails= (object) => {
        let requestBody = ReservedManagerRequestBody.buildGetPackageDetails(object.packageLots);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendUnReserved= (object) => {
        let requestBody = ReservedManagerRequestBody.buildUnReserved(object.materialLots);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendGetReservedMLotByPackageRule = (object) => {
        let requestBody = ReservedManagerRequestBody.buildGetReservedMLotByPackageRule(object.docLineRrn, object.materialLots, object.packageRule);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }

    static sendPackedRuleListByDocRrn = (object) => {
        let requestBody = ReservedManagerRequestBody.buildGetPackedRuleByDocRrn(object.docLineRrn);
        let requestHeader = new ReservedManagerRequestHeader();
        let request = new Request(requestHeader, requestBody, UrlConstant.GCReservedUrl);
        let requestObject = {
            request: request,
            success: object.success
        }
        MessageUtils.sendRequest(requestObject);
    }
}

