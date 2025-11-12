# Features Quick Reference Guide

## 🚀 How to Use New Features

### 1. View Service Orders
```
Navigation: Sidebar → Services (Wrench icon)
URL: /dashboard/service-orders

What you'll see:
- Stats: Pending, Confirmed, Completed, Revenue
- Service order cards with customer info
- Property type, date, time, address
- "View Details" button for full information
- "Assign Agent" button for pending orders
```

### 2. Manage Referrals
```
Navigation: Sidebar → Referrals (Gift icon)
URL: /dashboard/referrals

What you'll see:
- Stats: Total, Completed, Pending, Bonuses
- Recent referrals with referrer/referee info
- Top referrers leaderboard
- Referral program details (₹20 + ₹10)
```

### 3. View User Details
```
Navigation: Users → Actions → View Details

What you'll see:
- Wallet balance (green highlighted)
- Referral code (SCRAP-USERXXX)
- Total referrals & earnings
- Saved addresses (Home/Work/Other)
- User statistics
- KYC documents
```

### 4. View Order Photos & Notes
```
Navigation: Orders → Click any order

What you'll see:
- Customer uploaded photos (grid layout)
- Customer notes (yellow box)
- All existing order details
```

### 5. Change Order Status
```
Navigation: Orders → Actions → Change Status

Available statuses:
🟡 Pending → 🔵 Assigned → 🟣 On the Way → 🟢 Completed
                                              ↓
                                         🔴 Cancelled

How to use:
1. Click Actions (three dots)
2. Hover over "Change Status"
3. Select new status
4. Toast notification confirms change
```

---

## 📊 Data Overview

### Service Orders (3 sample orders):
- SRV-001: Demolition Service (Pending)
- SRV-002: Paper Shredding (Confirmed)
- SRV-003: Junk Removal (Completed)

### Referrals (4 sample referrals):
- REF-001: Anika → Priya (Completed, ₹30)
- REF-002: Anika → Rahul (Completed, ₹30)
- REF-003: Priya → Neha (Pending, ₹0)
- REF-004: Anika → Amit (Completed, ₹30)

### Users with Referral Data:
- Anika Sharma: SCRAP-USER001 (3 referrals, ₹60 earned)
- Priya Singh: SCRAP-USER003 (1 referral, ₹20 earned)

### Orders with Photos:
- order-101: 3 photos + notes
- order-102: 2 photos + notes

---

## 🎨 Visual Guide

### Service Orders Page Layout:
```
┌─────────────────────────────────────────┐
│  Service Orders                         │
│  Manage professional service bookings   │
├─────────────────────────────────────────┤
│  [Pending] [Confirmed] [Completed] [₹]  │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │ 🔧 Demolition Service  [Pending]│   │
│  │ Order #SRV-001                  │   │
│  │ 👤 Anika Sharma                 │   │
│  │ 📞 +91 9876543210               │   │
│  │ 📅 2024-11-15 • 9:00 AM        │   │
│  │ 📍 Mumbai                       │   │
│  │ [View Details] [Assign Agent]   │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Referrals Page Layout:
```
┌─────────────────────────────────────────┐
│  Referral Management                    │
├─────────────────────────────────────────┤
│  [Total] [Completed] [Pending] [Paid]   │
├─────────────────────────────────────────┤
│  Recent Referrals    │  Top Referrers   │
│  ┌──────────────┐   │  ┌────────────┐  │
│  │ Anika Sharma │   │  │ #1 Anika   │  │
│  │ SCRAP-USER001│   │  │ 3 referrals│  │
│  │ → Priya Singh│   │  │ ₹60 earned │  │
│  │ ₹30 [✓]      │   │  └────────────┘  │
│  └──────────────┘   │                   │
└─────────────────────────────────────────┘
```

### User Details Dialog:
```
┌─────────────────────────────────────────┐
│  👤 Anika Sharma                        │
│  anika@example.com | +91 9876543210    │
│  [seller] [verified]                    │
├─────────────────────────────────────────┤
│  Personal Info      │  Saved Addresses  │
│  ┌──────────────┐  │  ┌──────────────┐ │
│  │ 📞 Phone     │  │  │ 🏠 Home      │ │
│  │ 📧 Email     │  │  │ 123, Rose    │ │
│  │ 📍 Address   │  │  │ Villa, Mumbai│ │
│  └──────────────┘  │  └──────────────┘ │
│                     │                    │
│  Wallet & Referrals │                    │
│  ┌──────────────────────────────────┐  │
│  │ Wallet Balance:    ₹1,500.75     │  │
│  │ Referral Code:     SCRAP-USER001 │  │
│  │ Total Referrals:   3             │  │
│  │ Referral Earnings: ₹60           │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 🔍 Search & Filter Tips

### Service Orders:
- Filter by status (coming soon)
- Search by customer name
- Filter by property type
- Sort by date

### Referrals:
- View by status (Completed/Pending)
- Sort by date
- Filter by referrer
- Search by code

### Users:
- Filter by role
- Search by name/email
- Filter by KYC status
- Sort by referrals

---

## 💡 Pro Tips

### For Service Orders:
1. Check "Special Requirements" in details
2. Verify property type before assignment
3. Review estimated vs final pricing
4. Contact customer before service

### For Referrals:
1. Monitor pending referrals
2. Track top referrers for rewards
3. Verify bonus payments
4. Check referral code validity

### For User Management:
1. Check wallet balance before payouts
2. Verify saved addresses for orders
3. Review referral earnings
4. Monitor KYC status

### For Order Status:
1. Follow the workflow: Pending → Assigned → On the Way → Completed
2. Don't skip steps
3. Update status promptly
4. Add notes when changing status

---

## 🐛 Troubleshooting

### Service Orders not showing?
- Check `src/lib/data.ts` for serviceOrders array
- Verify navigation link is correct
- Clear browser cache

### Referrals stats incorrect?
- Check referrals array in data.ts
- Verify user totalReferrals field
- Refresh the page

### User details missing?
- Ensure user has referralCode field
- Check savedAddresses array
- Verify walletBalance is set

### Photos not displaying?
- Check order.photos array exists
- Verify image URLs are valid
- Check network tab for errors

---

## 📱 Mobile Testing

### Test on:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Android Tablet (Chrome)

### Check:
- Service orders cards stack properly
- Referral stats are readable
- User details dialog scrolls
- Photos display in grid
- Status dropdown works

---

## 🎯 Quick Actions

### Daily Tasks:
1. Check pending service orders
2. Review new referrals
3. Verify pending bonuses
4. Update order statuses
5. Assign agents to orders

### Weekly Tasks:
1. Review top referrers
2. Analyze service order trends
3. Check wallet balances
4. Verify KYC documents
5. Generate reports

### Monthly Tasks:
1. Calculate referral ROI
2. Review service pricing
3. Analyze user growth
4. Plan expansions
5. Update policies

---

## 📞 Support

### Need Help?
- Check IMPLEMENTATION_COMPLETE.md for details
- Review DASHBOARD_APP_ALIGNMENT.md for context
- See QUICK_IMPLEMENTATION_GUIDE.md for code

### Report Issues:
- Check browser console for errors
- Verify data in src/lib/data.ts
- Test in different browsers
- Check network requests

---

**Last Updated**: November 13, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
