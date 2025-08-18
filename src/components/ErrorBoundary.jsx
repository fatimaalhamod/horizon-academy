// src/components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // تحديث الحالة لعرض واجهة خطأ
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // تسجيل الخطأ في الكونسول
    console.error("❌ ErrorBoundary: تم اكتشاف خطأ", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">عذرًا، حدث خطأ ما!</h2>
            <p className="text-gray-600 mb-6">
              لا تقلق، نحن نعمل على إصلاح المشكلة.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              إعادة تحميل الصفحة
            </button>
            <details className="mt-4 text-sm text-gray-500 text-right">
              <summary>عرض تفاصيل الخطأ</summary>
              <pre className="mt-2 text-xs text-red-600 text-right font-mono">
                {this.state.error && this.state.error.toString()}
              </pre>
              <pre className="mt-2 text-xs text-gray-600 text-right font-mono">
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;