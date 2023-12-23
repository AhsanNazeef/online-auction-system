# Online Auction System

This repository contains the source code for an Online Auction System, designed to facilitate auctions between sellers and bidders. The system allows users to set up products for bidding, manage auctions, and handle transactions. It provides functionalities for admins, sellers, buyers, and various features associated with auctions, bids, products, and optional billing.

## User Roles and Functionalities

### Admin

- **Default Admin**
- **Admin Actions:**
  - Add/Remove other admins
  - Generate reports on products up for bidding and auction results
  - Modify or remove sellers, buyers, and products

### Seller

- **Sign Up/Sign In**
- **Actions:**
  - Post products for auction
  - List products in available auctions
  - View reports of their products

### Buyer/Bidder

- **Sign Up/Sign In**
- **Actions:**
  - View list of products available for bidding
  - Place bids on products
  - Provide reviews to sellers after winning a bid

## Auctions

- **Time-bound:**
  - Start and end times
  - Admin approval or creation
- **Options:**
  - Minimum bids
  - Seller-initiated auction creation (admin approval required)
- **Completion:**
  - Automatic end after the specified duration
  - Email notifications to winners and losers

## Bids

- **Seller Actions:**
  - View bids on their products
- **Buyer Actions:**
  - Bid on available products
  - See the highest bid
  - Manual or automatic bidding feature

## Products

- **Seller Actions:**
  - Add/Edit/Delete their products
  - Multiple images for each product
  - Define minimum bid amount
  - Manage product statuses: live, sold, delivered

## Billing (Optional)

- **After Winning a Bid:**
  - Buyer receives an email with a button to send a digital check to the seller
  - Utilizes checkbook.io, bill.com, stamp, or other online billing APIs
