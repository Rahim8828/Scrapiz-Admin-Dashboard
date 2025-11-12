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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">Referral Management</h2>
        <p className="text-muted-foreground">Track and manage the referral program</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.totalReferrals}</div>
            <p className="text-xs text-green-700">All time</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.completedReferrals}</div>
            <p className="text-xs text-green-700">Successful referrals</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.pendingReferrals}</div>
            <p className="text-xs text-orange-700">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Bonus Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">₹{stats.totalBonusPaid}</div>
            <p className="text-xs text-green-700">Lifetime</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Pending Bonus</CardTitle>
            <Gift className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">₹{stats.pendingBonuses}</div>
            <p className="text-xs text-orange-700">To be paid</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Referrals */}
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-100">Recent Referrals</CardTitle>
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
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Top Referrers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referrerStats.map((user, index) => (
                <div key={user.id} className="flex items-center gap-4 p-3 border border-green-100 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                    #{index + 1}
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
              ))}
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
