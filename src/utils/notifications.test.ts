import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createPointsCreditedNotification,
  createKycStatusNotification,
  createPayoutNotification,
  formatNotificationTime,
} from './notifications.ts';

test('createPointsCreditedNotification builds valid points alert', () => {
  const notif = createPointsCreditedNotification(850, 'SA-8832', 'CPVC Pipes');
  assert.equal(notif.type, 'points');
  assert.equal(notif.points, 850);
  assert.match(notif.title, /850/);
  assert.match(notif.message, /SA-8832/);
  assert.equal(notif.read, false);
  assert.equal(notif.actionTab, 'passbook');
});

test('createKycStatusNotification builds verified status update', () => {
  const notif = createKycStatusNotification('verified', 'KRL-PLUMB-4821');
  assert.equal(notif.type, 'kyc');
  assert.match(notif.title, /Approved/);
  assert.match(notif.message, /KRL-PLUMB-4821/);
  assert.equal(notif.actionTab, 'rewards');
});

test('createPayoutNotification builds UPI dispatch alert', () => {
  const notif = createPayoutNotification(3000, 'rajesh@okhdfcbank', '9876543210');
  assert.equal(notif.type, 'payout');
  assert.match(notif.title, /3,000/);
  assert.match(notif.message, /rajesh@okhdfcbank/);
});

test('formatNotificationTime formats relative time correctly', () => {
  const now = Date.now();
  assert.equal(formatNotificationTime(now), 'Just now');
  assert.equal(formatNotificationTime(now - 120 * 1000), '2m ago');
  assert.equal(formatNotificationTime(now - 7200 * 1000), '2h ago');
});
