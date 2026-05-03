import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from "lucide-react";
import { usePayments } from "@/hooks/usePayments";
import { useExpenses } from "@/hooks/useExpenses";

const Reports = () => {
  const { payments, isLoading: paymentsLoading } = usePayments();
  const { expenses, isLoading: expensesLoading } = useExpenses();

  const totalRevenue = payments
    .filter((p: any) => p.status === 'paid')
    .reduce((sum: number, p: any) => sum + p.amount, 0);
  
  const totalExpenses = expenses
    .reduce((sum: number, e: any) => sum + e.amount, 0);

  const netProfit = totalRevenue - totalExpenses;
  const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics & Reports</h1>
        <p className="text-slate-500 mt-1">Deep dive into your property's financial performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> 12%
              </Badge>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900">₹{totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <TrendingDown className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> 8%
              </Badge>
            </div>
            <p className="text-sm font-medium text-slate-500">Total Expenses</p>
            <p className="text-2xl font-bold text-slate-900">₹{totalExpenses}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Net Profit</p>
            <p className="text-2xl font-bold text-slate-900">₹{netProfit}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <PieChart className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">Profit Margin</p>
            <p className="text-2xl font-bold text-slate-900">{Math.round(margin)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison of income and operational costs.</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-end gap-4 px-10 pb-10">
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '70%' }}>
                <div className="absolute bottom-0 w-full bg-emerald-400 rounded-t-lg transition-all duration-1000" style={{ height: '80%' }} />
              </div>
              <span className="text-xs text-slate-400 font-bold">JAN</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '85%' }}>
                <div className="absolute bottom-0 w-full bg-emerald-400 rounded-t-lg transition-all duration-1000" style={{ height: '65%' }} />
              </div>
              <span className="text-xs text-slate-400 font-bold">FEB</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '60%' }}>
                <div className="absolute bottom-0 w-full bg-emerald-400 rounded-t-lg transition-all duration-1000" style={{ height: '90%' }} />
              </div>
              <span className="text-xs text-slate-400 font-bold">MAR</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: '95%' }}>
                <div className="absolute bottom-0 w-full bg-emerald-400 rounded-t-lg transition-all duration-1000" style={{ height: '40%' }} />
              </div>
              <span className="text-xs text-slate-400 font-bold">APR</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Breakdown of expenses by category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">Maintenance</span>
                <span className="text-slate-900">45%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">Utilities</span>
                <span className="text-slate-900">30%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600">Salaries</span>
                <span className="text-slate-900">20%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Badge = ({ children, variant, className }: any) => (
  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${className}`}>
    {children}
  </span>
);

export default Reports;