'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, TrendingUp, Users, DollarSign, CheckCircle, Clock } from "lucide-react";
import { referrals, users } from "@/lib/data";

export default function ReferralsPage() {
  const stats = {
    totalReferrals: referrals.length,
    completedReferrals: referrals.filter(r => r.status === 'Completed').length,
    pendingReferrals: referrals.filter(r => r.status === 'Pending').length,
    totalBonusPaid: referrals.filter(r => r.status === 'Completed').reduce((sum, r) => sum + r.bonusPaid, 0),
    pendingBonuses: referrals.filter(r => r.status === 'Pending').reduce((sum, r) => sum + (r.referrerBonus + r.refereeBonus), 0)
  };

  // Top referrers
  const referrerStats = users
    .filter(u => u.totalReferrals && u.totalReferrals > 0)
    .sort((a, b) => (b.totalReferrals || 0) - (a.totalReferrals || 0))
    .slice(0, 5);

  const conversionRate = ((stats.completedReferrals / stats.totalReferrals) * 100).toFixed(1);
  const avgPerUser = (referrals.length / referrerStats.length).toFixed(1);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Referral Management</h2>
          <p className="text-muted-foreground">Track and manage the referral program</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card 
          className="transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalReferrals}</div>
            <p className="text-xs text-purple-100">All time</p>
          </CardContent>
        </Card>

        <Card 
          className="transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.completedReferrals}</div>
            <p className="text-xs text-green-100">Successful referrals</p>
          </CardContent>
        </Card>

        <Card 
          className="transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pending</CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pendingReferrals}</div>
            <p className="text-xs text-orange-100">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card 
          className="transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Bonus Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{stats.totalBonusPaid}</div>
            <p className="text-xs text-cyan-100">Lifetime</p>
          </CardContent>
        </Card>

        <Card 
          className="transition-all hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pending Bonus</CardTitle>
            <Gift className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹{stats.pendingBonuses}</div>
            <p className="text-xs text-pink-100">To be paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{conversionRate}%</div>
            <p className="text-xs text-purple-600">Referrals completed</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per User</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{avgPerUser}</div>
            <p className="text-xs text-blue-600">Referrals per active user</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{referrerStats.length}</div>
            <p className="text-xs text-green-600">Users with referrals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Referrals */}
        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              Recent Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referrals.slice(0, 5).map((ref) => (
                <div key={ref.id} className="flex items-center justify-between p-3 border border-green-100 rounded-lg hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{ref.referrerName}</span>
                      <Badge variant="outline" className="text-xs">{ref.referrerCode}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Referred: <span className="font-medium">{ref.refereeName}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{ref.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold text-green-600">₹{ref.bonusPaid}</div>
                      <div className="text-xs text-muted-foreground">Bonus</div>
                    </div>
                    <Badge variant={ref.status === 'Completed' ? 'default' : 'secondary'}>
                      {ref.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Top Referrers Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referrerStats.map((user, index) => {
                const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
                const bgColors = ['bg-yellow-100', 'bg-gray-100', 'bg-orange-100'];
                const textColors = ['text-yellow-700', 'text-gray-700', 'text-orange-700'];
                
                return (
                  <div key={user.id} className="flex items-center gap-4 p-3 border border-green-100 rounded-lg hover:shadow-md transition-shadow">
                    <div 
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${index < 3 ? bgColors[index] : 'bg-green-100'} ${index < 3 ? textColors[index] : 'text-green-700'} font-bold text-sm`}
                      style={index < 3 ? { boxShadow: `0 0 10px ${medalColors[index]}40` } : {}}
                    >
                      {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.referralCode}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{user.totalReferrals}</div>
                      <div className="text-xs text-muted-foreground">Referrals</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-700">₹{(user.totalReferrals || 0) * 20}</div>
                      <div className="text-xs text-muted-foreground">Earned</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Program Info */}
      <Card className="border-green-100 bg-green-50/50 dark:bg-green-900/10">
        <CardHeader>
          <CardTitle className="text-green-900 dark:text-green-100">Referral Program Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200">
              <div className="font-semibold text-green-900 dark:text-green-100 mb-2">Referrer Bonus</div>
              <div className="text-2xl font-bold text-green-600">₹20</div>
              <p className="text-xs text-muted-foreground mt-1">Per successful referral</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200">
              <div className="font-semibold text-green-900 dark:text-green-100 mb-2">Referee Bonus</div>
              <div className="text-2xl font-bold text-green-600">₹10</div>
              <p className="text-xs text-muted-foreground mt-1">Welcome bonus for new users</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200">
              <div className="font-semibold text-green-900 dark:text-green-100 mb-2">Total Impact</div>
              <div className="text-2xl font-bold text-green-600">₹30</div>
              <p className="text-xs text-muted-foreground mt-1">Per successful referral</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
