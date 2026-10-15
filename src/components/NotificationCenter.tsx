import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { formatNotificationTime } from '../utils/notifications.ts';

export const NotificationCenter: React.FC = () => {
  const {
    notifications,
    isNotificationPanelOpen,
    setIsNotificationPanelOpen,
    markAllNotificationsAsRead,
    clearNotifications,
    setActiveTab,
    triggerSimulatedNotification,
    language,
  } = useApp();

  if (!isNotificationPanelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1c1816] rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#ffdbca] dark:bg-[#773300] text-[#964407] dark:text-[#ffdbca] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                {language === 'hi' ? 'सूचनाएं' : 'Notifications & Alerts'}
              </h3>
              <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
                Shiv Agency Trade Dispatch
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="text-[11px] font-bold text-[#964407] dark:text-[#e07937] hover:underline cursor-pointer"
              >
                {language === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsNotificationPanelOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#887368] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Quick Simulator Bar */}
        <div className="bg-[#f6f3f2] dark:bg-[#24201d] px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-[#554339] dark:text-[#d5c4ba]">
            {language === 'hi' ? 'टेस्ट अलर्ट:' : 'Trigger Demo Alert:'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                triggerSimulatedNotification('points');
                setIsNotificationPanelOpen(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#964407] hover:bg-[#b65c21] text-white text-[10px] font-bold shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[13px]">add_circle</span>
              <span>+Pts Alert</span>
            </button>

            <button
              type="button"
              onClick={() => {
                triggerSimulatedNotification('kyc');
                setIsNotificationPanelOpen(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#39654e] hover:bg-[#2e5a44] text-white text-[10px] font-bold shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>KYC Alert</span>
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center text-[#887368]">
              <span className="material-symbols-outlined text-[42px] mb-2 opacity-50">
                notifications_off
              </span>
              <p className="text-[13px] font-semibold">No notifications right now</p>
              <p className="text-[11px] mt-0.5">
                New points additions and KYC updates will appear here.
              </p>
            </div>
          ) : (
            notifications.map((notif) => {
              const isPoints = notif.type === 'points';
              const isKyc = notif.type === 'kyc';

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    if (notif.actionTab) {
                      setActiveTab(notif.actionTab);
                      setIsNotificationPanelOpen(false);
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    notif.read
                      ? 'bg-neutral-50 dark:bg-[#24201d]/60 border-neutral-200 dark:border-neutral-800'
                      : 'bg-white dark:bg-[#24201d] border-[#ffdea6] dark:border-[#715000] shadow-sm'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isPoints
                        ? 'bg-[#ffdea6] text-[#7b5800]'
                        : isKyc
                        ? 'bg-[#bdeed0] text-[#002113]'
                        : 'bg-[#fdc34d] text-[#715000]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPoints ? 'toll' : isKyc ? 'verified_user' : 'bolt'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-[13px] font-bold truncate ${
                          notif.read
                            ? 'text-[#554339] dark:text-[#d5c4ba]'
                            : 'text-[#1b1b1c] dark:text-[#f5eeea]'
                        }`}
                      >
                        {language === 'hi' && notif.hindiTitle ? notif.hindiTitle : notif.title}
                      </h4>
                      <span className="text-[10px] text-[#887368] ml-2 flex-shrink-0">
                        {formatNotificationTime(notif.timestamp)}
                      </span>
                    </div>

                    <p className="text-[12px] text-[#887368] dark:text-[#9e8a7f] mt-0.5 leading-relaxed">
                      {language === 'hi' && notif.hindiMessage
                        ? notif.hindiMessage
                        : notif.message}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-neutral-200/50 dark:border-neutral-800">
                      <span className="text-[10px] font-bold text-[#964407] dark:text-[#e07937] flex items-center gap-0.5">
                        <span>
                          {language === 'hi' && notif.actionHindiLabel
                            ? notif.actionHindiLabel
                            : notif.actionLabel || 'View Details'}
                        </span>
                        <span className="material-symbols-outlined text-[13px]">
                          arrow_forward
                        </span>
                      </span>

                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#964407]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-[#f6f3f2] dark:bg-[#24201d] flex items-center justify-between">
            <span className="text-[11px] text-[#887368]">
              {notifications.length} alerts logged
            </span>
            <button
              type="button"
              onClick={clearNotifications}
              className="text-[11px] text-[#ba1a1a] font-bold hover:underline cursor-pointer"
            >
              {language === 'hi' ? 'सभी हटाएं' : 'Clear all'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
