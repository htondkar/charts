import React, { Component } from "react";
import "./App.css";
import NumberFormat from "react-number-format";
import calculate from "./calculate";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const Field = ({ text, name, onChange, value }) =>
  <div>
    <label htmlFor={name}>{text}</label>
    <NumberFormat
      name={name}
      value={value}
      onChange={onChange}
      thousandSeparator={true}
    />
  </div>;

const RField = ({ text, name, onChange, value }) =>
  <div>
    <label htmlFor={name}>{text}</label>
    <input name={name} type="text" value={value} onChange={onChange} />
  </div>;

class App extends Component {
  constructor() {
    super();
    this.state = {
      AdInvestment: 50000000,
      months: 36,
      baseCustomers: 50,
      basePartners: 10,
      population: 12500000,
      bills: 1500000,
      ccsc: 0.005, // each customer brings 0.003 new partners each month
      cssc: 0.15, // each customer brings 0.15 new customers each month
      pcsc: 15, // each partner brings 15 bew customers each month
      pssc: 0.1, // each partner brings 0.1 bew customers each month
      deliveryManSalary: 1800000,
      inFieldMarketer: 2,
      inFieldMarketerSalary: 2500000,
      initialInvestment: 600000000,
      officeEmpCount: 5,
      officeEmpSalary: 2200000,
      rent: 2000000,
      rentDeposit: 50000000,
      howMuchInvInAds: 0.2,
      customerToOrder: "method1",
      result: {
        balance: [],
        profite: []
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const result = calculate(this.state);
    this.setState({ result });
  };

  onChange = (e, value) => {
    const { name } = e.target;
    this.setState({ [name]: parseInt(value, 10) });
  };

  rOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: parseFloat(value) });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>قنادی عمو رضا</h2>
        </div>
        <div id="main">
          <form id="main-form">
            <div>نکته: دستمزد ها شامل بیمه نیز باید بشود</div>
            <label htmlFor="customerToOrder">روش تبدیل مشتری به سفارش</label>
            <select
              name="customerToOrder"
              onChange={this.rOnChange}
              value={this.state.customerToOrder}
            >
              <option value="method1">میزان سهم بازار</option>
              <option value="method2">تبدیل به تعداد خانوار</option>
            </select>
            <Field
              text="سرمایه اولیه جذب شده"
              name="initialInvestment"
              onChange={this.onChange}
              value={this.state.initialInvestment}
            />
            <Field
              text="تعداد ماه ها"
              name="months"
              onChange={this.onChange}
              value={this.state.months}
            />
            <Field
              text="کل جمعیت بازار"
              name="population"
              onChange={this.onChange}
              value={this.state.population}
            />
            <Field
              text="تعداد اولیه مشتری ها"
              name="baseCustomers"
              onChange={this.onChange}
              value={this.state.baseCustomers}
            />
            <Field
              text="تعداد اولیه قنادی ها؟"
              name="basePartners"
              onChange={this.onChange}
              value={this.state.basePartners}
            />
            <RField
              text="چند درصد سود ماهانه در تبلیغات هزینه شود؟"
              name="howMuchInvInAds"
              onChange={this.rOnChange}
              value={this.state.howMuchInvInAds}
            />
            <RField
              text="ضریب تاثیر قنادی ها روی هم"
              name="pssc"
              onChange={this.rOnChange}
              value={this.state.pssc}
            />
            <RField
              text="ضریب تاثیر قنادی ها روی مشتری ها"
              name="pcsc"
              onChange={this.rOnChange}
              value={this.state.pcsc}
            />
            <RField
              text="ضریب تاثیر مشتری ها روی هم"
              name="cssc"
              onChange={this.rOnChange}
              value={this.state.cssc}
            />
            <RField
              text="ضریب تاثیر مشتری ها روی قنادی ها"
              name="ccsc"
              onChange={this.rOnChange}
              value={this.state.ccsc}
            />
            <Field
              text="بودجه تبلیغاتی"
              name="AdInvestment"
              onChange={this.onChange}
              value={this.state.AdInvestment}
            />
            <Field
              text="تعداد بازاریاب در محل قنادی"
              name="inFieldMarketer"
              onChange={this.onChange}
              value={this.state.inFieldMarketer}
            />
            <Field
              text="دستمزد هر بازاریاب در محل"
              name="inFieldMarketerSalary"
              onChange={this.onChange}
              value={this.state.inFieldMarketerSalary}
            />
            <Field
              text="تعداد کارمندان دفتر"
              name="officeEmpCount"
              onChange={this.onChange}
              value={this.state.officeEmpCount}
            />
            <Field
              text="دستمزد هر کارمند"
              name="officeEmpSalary"
              onChange={this.onChange}
              value={this.state.officeEmpSalary}
            />
            <Field
              text="دستمزد هر پیک"
              name="deliveryManSalary"
              onChange={this.onChange}
              value={this.state.deliveryManSalary}
            />
            <Field
              text="پول پیش دفتر"
              name="rentDeposit"
              onChange={this.onChange}
              value={this.state.rentDeposit}
            />
            <Field
              text="هزینه اجاره دفتر"
              name="rent"
              onChange={this.onChange}
              value={this.state.rent}
            />
            <Field
              text="هزینه آب و برق و ..."
              name="bills"
              onChange={this.onChange}
              value={this.state.bills}
            />
            <input type="submit" value="محاسبه" onClick={this.handleSubmit} />
          </form>
          <div className="result">
            MT سود ماهانه
            <LineChart width={400} height={400} data={this.state.result.profit}>
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
            MT حساب بانکی
            <LineChart
              width={400}
              height={400}
              data={this.state.result.balance}
            >
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
          </div>
          <div className="result">
            تعداد پیک مورد نیاز
            <LineChart width={400} height={400} data={this.state.result.peyk}>
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
            تعداد مشتری های ثبت شده در سیستم
            <LineChart
              width={400}
              height={400}
              data={this.state.result.moshtari}
            >
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
          </div>
          <div className="result">
            خرج ماهانه
            <LineChart
              width={400}
              height={400}
              data={this.state.result.expenditure}
            >
              <Line
                type="monotone"
                dataKey="ex"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
            سرمایه گذاری در تبلیغات
            <LineChart width={400} height={400} data={this.state.result.adInv}>
              <Line
                type="monotone"
                dataKey="adInv"
                stroke="#8884d8"
                activeDot={{ r: 4 }}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
            </LineChart>
          </div>
          <div className="result">
            <div>
              سود این ماه :
              {parseInt(this.state.result.ProfitInThisMonth, 10)}
            </div>
            <div>
              تعداد سفارشات ماه :
              {parseInt(this.state.result.monthlyOrders, 10)}
            </div>
            <div>
              تعداد پیک های مورد نیاز این ماه :
              {parseInt(this.state.result.deliveryMenNeeded, 10)}
            </div>
            <div>
              تعداد مشتری ها :
              {parseInt(this.state.result.baseCustomers, 10)}
            </div>
            <div>
              تعداد قنادی ها :
              {parseInt(this.state.result.basePartners, 10)}
            </div>
            <div>
              سود پول در بانک بصورت روز شمار:
              {parseInt(this.state.result.interestOfMoneyInBank, 10)}
            </div>
            <div>
              حساب بانکی:
              {parseInt(this.state.result.initialCapital, 10)}
            </div>
            <div>
              نفوذ در بازار :
              {this.state.result.realMarketShare * 100}%
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
