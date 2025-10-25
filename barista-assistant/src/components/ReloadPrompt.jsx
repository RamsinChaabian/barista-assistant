// src/components/ReloadPrompt.jsx

import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // می‌توانید لاگ بگیرید
      // console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  // نمایش پیام زمانی که برنامه آفلاین شده یا آپدیت جدیدی در دسترس است
  if (offlineReady || needRefresh) {
    return (
      <div className="fixed right-4 bottom-4 z-50 p-4 rounded-lg shadow-lg bg-warm-light text-coffee-brown border border-coffee-brown/20">
        <div className="flex items-start gap-4">
          <div className="flex-grow">
            {offlineReady ? (
              <span className="font-semibold">برنامه برای استفاده آفلاین آماده است.</span>
            ) : (
              <span className="font-semibold">نسخه جدیدی در دسترس است!</span>
            )}
          </div>
          
          {needRefresh && (
            <button
              className="px-3 py-1 bg-coffee-brown text-white rounded-md text-sm font-bold shadow hover:bg-opacity-90 transition-colors"
              onClick={() => updateServiceWorker(true)}
            >
              به‌روزرسانی
            </button>
          )}

          <button
            className="px-2 py-1 text-sm text-coffee-brown/70 hover:text-coffee-brown"
            onClick={() => close()}
          >
            بستن
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default ReloadPrompt