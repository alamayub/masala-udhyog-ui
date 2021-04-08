import Vue from 'vue'
import VueRouter from 'vue-router'

// Login
import Login from '../views/Login.vue'
// Home
import Home from '../views/Home.vue'
// Dashboard
import Dashboard from '../views/dashboard/Dashboard.vue'
// Purchase
import Purchase from '../views/purchase/Purchase.vue'

// Purchase Purchase
import PurchasePurchase from '../views/purchase/purchase/PurchasePurchase.vue'
import PurchasePurchaseAdd from '../views/purchase/purchase/PurchaseAdd.vue'
import PurchasePurchaseDetail from '../views/purchase/purchase/PurchaseDetail.vue'
import PurchasePurchaseList from '../views/purchase/purchase/PurchaseList.vue'

// Purchase Return
import PurchaseReturn from '../views/purchase/return/PurchaseReturn.vue'
import PurchaseReturnAdd from '../views/purchase/return/PurchaseReturnAdd.vue'
import PurchaseReturnDetail from '../views/purchase/return/PurchaseReturnDetail.vue'
import PurchaseReturnList from '../views/purchase/return/PurchaseReturnList.vue'

// Sales
import Sales from '../views/sales/Sales.vue'
// Sales Order
import SalesOrder from '../views/sales/order/SalesOrder.vue'
import SalesOrderAdd from '../views/sales/order/SalesOrderAdd.vue'
import SalesOrderDetail from '../views/sales/order/SalesOrderDetail.vue'
import SalesOrderList from '../views/sales/order/SalesOrderList.vue'

// Sales Return
import SalesReturn from '../views/sales/return/SalesReturn.vue'
import SalesReturnAdd from '../views/sales/return/SalesReturnAdd.vue'
import SalesReturnDetail from '../views/sales/return/SalesReturnDetail.vue'
import SalesReturnList from '../views/sales/return/SalesReturnList.vue'

// Sales Sales
import SalesSales from '../views/sales/sales/SalesSales.vue'
import SalesSalesAdd from '../views/sales/sales/SalesAdd.vue'
import SalesSalesDetail from '../views/sales/sales/SalesDetail.vue'
import SalesSalesList from '../views/sales/sales/SalesList.vue'

// Expenses
import Expenses from '../views/expenses/Expenses.vue'
import ExpensesExpanses from '../views/expenses/expenses/ExpensesExpenses.vue'
import ExpensesExpansesAdd from '../views/expenses/expenses/ExpensesAdd.vue'
import ExpensesExpansesDetail from '../views/expenses/expenses/ExpensesDetail.vue'
import ExpensesExpansesList from '../views/expenses/expenses/ExpensesList.vue'

// Stocks
import Stocks from '../views/stocks/Stocks.vue'
import StocksList from '../views/stocks/stocks/StocksList.vue'
import StocksAdd from '../views/stocks/stocks/StocksAdd.vue'

// Vendors & Customers
import VendorsCustomers from '../views/vendors/VendorsCustomers.vue'
import VC from '../views/vendors/vendors-customers/VC.vue'
import VendorsCustomersAdd from '../views/vendors/vendors-customers/VendorsCustomersAdd.vue'
import VendorsCustomersDetail from '../views/vendors/vendors-customers/VendorsCustomersDetail.vue'
import VendorsCustomersList from '../views/vendors/vendors-customers/VendorsCustomersList.vue'

// Raw Material
import RawMaterial from '../views/raw-material/RawMaterial.vue'
import RawMaterialAdd from '../views/raw-material/RawMaterialAdd.vue'
import RawMaterialEdit from '../views/raw-material/RawMaterialEdit.vue'
import RawMaterialList from '../views/raw-material/RawMaterialList.vue'


// Profile
import Profile from '../views/Profile.vue'

// page Not Found
import PageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requiresVisitor: true } },
  { 
    path: '/', 
    name: 'Home', 
    component: Home,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { 
        path: 'purchase', 
        name: 'Purchase', 
        component: Purchase,
        children: [
          { 
            path: '', 
            name: 'Purchase1', 
            component: PurchasePurchase,
            children: [
              { path: 'add', name: 'Purchase Add', component: PurchasePurchaseAdd },
              { path: 'detail/:id', name: 'Purchase Detail', component: PurchasePurchaseDetail },
              { path: '', name: 'Purchase List', component: PurchasePurchaseList }
            ]
          },
          
          { 
            path: 'return', 
            name: 'Return', 
            component: PurchaseReturn,
            children: [
              { path: 'add', name: 'Purchase Return Add', component: PurchaseReturnAdd },
              { path: 'detail/:id', name: 'Purchase Return Detail', component: PurchaseReturnDetail },
              { path: '', name: 'Purchase Return List', component: PurchaseReturnList }
            ]
          },
        ]
      },
      {
        path: '/sales',
        name: 'Sales',
        component: Sales,
        children: [ 
          { 
            path: 'order', 
            name: 'Sales Order', 
            component: SalesOrder,
            children: [
              { path: 'add', name: 'Sales Order Add', component: SalesOrderAdd },
              { path: 'detail/:id', name: 'Sales Order Detail', component: SalesOrderDetail },
              { path: '', name: 'Sales Order List', component: SalesOrderList }
            ]
          },
          { 
            path: 'return', 
            name: 'Sales Return', 
            component: SalesReturn,
            children: [
              { path: 'add', name: 'Sales Return Add', component: SalesReturnAdd },
              { path: 'detail/:id', name: 'Sales Return Detail', component: SalesReturnDetail },
              { path: '', name: 'Sales Return List', component: SalesReturnList }
            ]
          },
          { 
            path: '', 
            name: 'Sales1', 
            component: SalesSales,
            children: [
              { path: 'add', name: 'Sales Add', component: SalesSalesAdd },
              { path: 'detail/:id', name: 'Sales Detail', component: SalesSalesDetail },
              { path: '', name: 'Sales List', component: SalesSalesList }
            ]
          },
        ]
      },
      { 
        path: '/stocks', 
        name: 'Stocks', 
        component: Stocks,
        children: [
          { path: '', name: 'Stocks List', component: StocksList },
          { path: 'add', name: 'Stocks Add', component: StocksAdd }
        ] 
      },
      {
        path: 'expenses',
        name: 'Expenses',
        component: Expenses,
        children: [
          { 
            path: '',
            name: 'Expenses1',
            component: ExpensesExpanses,
            children: [
              { path: 'add', name: 'Expenses Add', component: ExpensesExpansesAdd },
              { path: 'detail/:id', name: 'Expenses Detail', component: ExpensesExpansesDetail },
              { path: '', name: 'Expenses List', component: ExpensesExpansesList }
            ]
          }
        ]
      },
      {
        path: 'vendors-customers',
        name: 'Vendors & Customers',
        component: VendorsCustomers,
        children: [
          { 
            path: '',
            name: 'VC',
            component: VC,
            children: [
              { path: 'add', name: 'Vendors Customers Add', component: VendorsCustomersAdd },
              { path: 'detail/:id', name: 'Vendors Customers Detail', component: VendorsCustomersDetail },
              { path: '', name: 'Vendors Customers List', component: VendorsCustomersList }
            ]
          }
        ]
      },
      {
        path: 'raw-material',
        name: 'Raw Material',
        component: RawMaterial,
        children: [ 
          { path: 'add', name: 'Raw Material Add', component: RawMaterialAdd },
          { path: 'edit/:id', name: 'Raw Material Edit', component: RawMaterialEdit },
          { path: '', name: 'Raw Material List', component: RawMaterialList }
        ]
      },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: '*', name: 'Page Not Found', component: PageNotFound }
    ] 
  },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
