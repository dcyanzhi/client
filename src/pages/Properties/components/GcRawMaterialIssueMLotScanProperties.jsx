import EntityScanProperties from "./entityProperties/EntityScanProperties";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import MaterialLot from "../../../api/dto/mms/MaterialLot";
import GcRawMaterialIssueMLotScanTable from "../../../components/Table/gc/GcRawMaterialIssueMLotScanTable";
import GcRawMaterialWaitIssueMLotProperties from "./GcRawMaterialWaitIssueMLotProperties";

export default class GcRawMaterialIssueMLotScanProperties extends EntityScanProperties{

    static displayName = 'GcRawMaterialIssueMLotScanProperties';
    
    constructor(props) {
        super(props);
        this.state = {...this.state, ...{showQueryFormButton: false}};
    }
    
    componentWillReceiveProps = (props) => {
      const {resetFlag} = props;
      if (resetFlag) {
        this.form.handleReset();
      }
    }

    queryData = (whereClause) => {
        const self = this;
        let {rowKey,tableData} = this.state;
        let waitIssueMLotList = this.waitIssueMLotProperties.state.tableData;
        let requestObject = {
          tableRrn: this.state.tableRrn,
          whereClause: whereClause,
          success: function(responseBody) {
            let queryDatas = responseBody.dataList;
            let data = undefined;
            if (queryDatas && queryDatas.length > 0) {
              let errorData = [];
              let trueData = [];
              tableData.forEach(data => {
                if(data.errorFlag){
                  errorData.push(data);
                } else {
                  trueData.push(data);
                }
              });
              tableData = [];
              queryDatas.forEach(data => {
                if (waitIssueMLotList.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                  data.errorFlag = true;
                }
                if(data.errorFlag){
                  errorData.unshift(data);
                } else if(trueData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                  trueData.unshift(data);
                }
              });
              errorData.forEach(data => {
                tableData.push(data);
              });
              trueData.forEach(data => {
                tableData.push(data);
              });
            } else {
              data = new MaterialLot();
              let materialLotId = self.form.props.form.getFieldValue(self.form.state.queryFields[0].name);
              data[rowKey] = materialLotId;
              data.setMaterialLotId(materialLotId);
              data.errorFlag = true;
              if (tableData.filter(d => d[rowKey] === data[rowKey]).length === 0) {
                tableData.unshift(data);
              }
            }
           
            self.setState({ 
              tableData: tableData,
              loading: false
            });
            self.form.resetFormFileds();
          }
        }
        TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    resetOrderData = (orderTable) => {
      orderTable.setState({
        data: [],
        loading: false,
        resetFlag: true
      });
  }

    buildTable = () => {
        return <GcRawMaterialIssueMLotScanTable orderTable={this.props.orderTable} pagination={false} 
                                    table={this.state.table} 
                                    data={this.state.tableData} 
                                    loading={this.state.loading} 
                                    resetData={this.resetData.bind(this)}
                                    resetFlag={this.state.resetFlag}
                                    onSearch={this.props.onSearch}
                                    />
    }

    buildOtherComponent = () => {
      return <GcRawMaterialWaitIssueMLotProperties ref={(waitIssueMLotProperties) => { this.waitIssueMLotProperties = waitIssueMLotProperties }} 
                                                 tableRrn={469576} />
  }
}