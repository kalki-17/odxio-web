// Enhanced Open Banking Demo with Modern UI
class OpenBankingApp {
  constructor() {
    this.sandboxAccounts = [
      { 
        id: 1,
        name: "Premium Checking", 
        type: "checking",
        balance: 15420.50,
        currency: "USD",
        lastUpdated: "2024-01-15T10:30:00Z"
      },
      { 
        id: 2,
        name: "High-Yield Savings", 
        type: "savings",
        balance: 32450.75,
        currency: "USD",
        lastUpdated: "2024-01-15T10:30:00Z"
      },
      { 
        id: 3,
        name: "Business Credit Card", 
        type: "credit",
        balance: -2840.25,
        currency: "USD",
        lastUpdated: "2024-01-15T10:30:00Z"
      },
      { 
        id: 4,
        name: "Investment Portfolio", 
        type: "investment",
        balance: 125430.80,
        currency: "USD",
        lastUpdated: "2024-01-15T10:30:00Z"
      }
    ];

    this.sandboxTransactions = [
      { 
        id: 1,
        date: "2024-01-15T09:15:00Z", 
        description: "Starbucks Coffee", 
        amount: -5.75,
        category: "food",
        merchant: "Starbucks",
        accountId: 1
      },
      { 
        id: 2,
        date: "2024-01-14T14:30:00Z", 
        description: "Salary Deposit", 
        amount: 8500.00,
        category: "income",
        merchant: "Tech Corp",
        accountId: 1
      },
      { 
        id: 3,
        date: "2024-01-14T08:45:00Z", 
        description: "Monthly Rent", 
        amount: -2400.00,
        category: "housing",
        merchant: "Property Management",
        accountId: 1
      },
      { 
        id: 4,
        date: "2024-01-13T16:20:00Z", 
        description: "Amazon Purchase", 
        amount: -89.99,
        category: "shopping",
        merchant: "Amazon",
        accountId: 3
      },
      { 
        id: 5,
        date: "2024-01-13T12:00:00Z", 
        description: "Investment Transfer", 
        amount: 2000.00,
        category: "transfer",
        merchant: "Investment Account",
        accountId: 4
      },
      { 
        id: 6,
        date: "2024-01-12T19:30:00Z", 
        description: "Uber Ride", 
        amount: -12.50,
        category: "transportation",
        merchant: "Uber",
        accountId: 1
      }
    ];

    this.isLoading = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateInsights();
    this.addNavigationInteractions();
  }

  setupEventListeners() {
    document.getElementById('fetchAccounts').addEventListener('click', () => {
      this.fetchAccounts();
    });

    document.getElementById('fetchTransactions').addEventListener('click', () => {
      this.fetchTransactions();
    });
  }

  addNavigationInteractions() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Add smooth scroll effect
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  showLoading(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
      </div>
    `;
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }

  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getCategoryIcon(category) {
    const icons = {
      food: 'fas fa-utensils',
      income: 'fas fa-arrow-up',
      housing: 'fas fa-home',
      shopping: 'fas fa-shopping-bag',
      transfer: 'fas fa-exchange-alt',
      transportation: 'fas fa-car',
      entertainment: 'fas fa-film',
      healthcare: 'fas fa-heart',
      education: 'fas fa-graduation-cap',
      default: 'fas fa-receipt'
    };
    return icons[category] || icons.default;
  }

  getAccountTypeIcon(type) {
    const icons = {
      checking: 'fas fa-university',
      savings: 'fas fa-piggy-bank',
      credit: 'fas fa-credit-card',
      investment: 'fas fa-chart-line'
    };
    return icons[type] || 'fas fa-wallet';
  }

  async fetchAccounts() {
    if (this.isLoading) return;
    
    this.showLoading('accountsResult');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const accountsHtml = this.sandboxAccounts.map(account => `
      <div class="account-card" data-account-id="${account.id}">
        <div class="account-header">
          <div class="account-name">
            <i class="${this.getAccountTypeIcon(account.type)}"></i>
            ${account.name}
          </div>
          <span class="account-type">${account.type}</span>
        </div>
        <div class="account-balance ${account.balance < 0 ? 'negative' : ''}">
          ${this.formatCurrency(account.balance, account.currency)}
        </div>
        <div class="account-meta">
          <small>Last updated: ${this.formatDate(account.lastUpdated)}</small>
        </div>
      </div>
    `).join('');

    document.getElementById('accountsResult').innerHTML = accountsHtml;
    this.hideLoading();
    
    // Add animation to account cards
    this.animateCards('.account-card');
    this.updateInsights();
  }

  async fetchTransactions() {
    if (this.isLoading) return;
    
    this.showLoading('transactionsResult');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const transactionsHtml = this.sandboxTransactions.map(transaction => `
      <div class="transaction-item" data-transaction-id="${transaction.id}">
        <div class="transaction-info">
          <div class="transaction-icon">
            <i class="${this.getCategoryIcon(transaction.category)}"></i>
          </div>
          <div class="transaction-details">
            <h4>${transaction.description}</h4>
            <div class="transaction-date">${this.formatDate(transaction.date)}</div>
            <div class="transaction-merchant">${transaction.merchant}</div>
          </div>
        </div>
        <div class="transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}">
          ${this.formatCurrency(transaction.amount)}
        </div>
      </div>
    `).join('');

    document.getElementById('transactionsResult').innerHTML = transactionsHtml;
    this.hideLoading();
    
    // Add animation to transaction items
    this.animateCards('.transaction-item');
    this.updateInsights();
  }

  animateCards(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.3s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  updateInsights() {
    const totalBalance = this.sandboxAccounts.reduce((sum, account) => sum + account.balance, 0);
    const transactionCount = this.sandboxTransactions.length;
    const recentTransactions = this.sandboxTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return transactionDate > weekAgo;
    }).length;

    // Update insight values with animation
    this.animateValue('.insight-value', this.formatCurrency(totalBalance), 0);
    this.animateValue('.insight-value:nth-child(2)', transactionCount, 1);
    
    // Add more insights if needed
    const insightsGrid = document.querySelector('.insights-grid');
    if (insightsGrid.children.length === 2) {
      const newInsight = document.createElement('div');
      newInsight.className = 'insight-card';
      newInsight.innerHTML = `
        <div class="insight-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="insight-content">
          <span class="insight-value">${recentTransactions}</span>
          <span class="insight-label">This Week</span>
        </div>
      `;
      insightsGrid.appendChild(newInsight);
    }
  }

  animateValue(selector, targetValue, index) {
    const element = document.querySelectorAll(selector)[index];
    if (!element) return;
    
    const isCurrency = typeof targetValue === 'string' && targetValue.includes('$');
    const numericValue = isCurrency ? parseFloat(targetValue.replace(/[$,]/g, '')) : targetValue;
    
    let currentValue = 0;
    const increment = numericValue / 30;
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        currentValue = numericValue;
        clearInterval(timer);
      }
      
      if (isCurrency) {
        element.textContent = this.formatCurrency(currentValue);
      } else {
        element.textContent = Math.floor(currentValue);
      }
    }, 50);
  }

  // Add search and filter functionality
  addSearchFunctionality() {
    // This could be expanded to add search bars for accounts and transactions
    console.log('Search functionality ready to be implemented');
  }

  // Add export functionality
  exportData(type) {
    const data = type === 'accounts' ? this.sandboxAccounts : this.sandboxTransactions;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Add error handling
  handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    
    const errorHtml = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Something went wrong</h3>
        <p>We're having trouble loading your data. Please try again.</p>
        <button class="btn btn-primary" onclick="location.reload()">
          <i class="fas fa-refresh"></i>
          Retry
        </button>
      </div>
    `;
    
    // Show error in appropriate container
    const containers = ['accountsResult', 'transactionsResult'];
    containers.forEach(containerId => {
      const container = document.getElementById(containerId);
      if (container && container.innerHTML.includes('spinner')) {
        container.innerHTML = errorHtml;
      }
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.openBankingApp = new OpenBankingApp();
  
  // Add some additional interactive features
  addTooltips();
  addKeyboardShortcuts();
});

// Add tooltips for better UX
function addTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
}

function showTooltip(event) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = event.target.getAttribute('data-tooltip');
  tooltip.style.cssText = `
    position: absolute;
    background: #1e293b;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  `;
  
  document.body.appendChild(tooltip);
  
  const rect = event.target.getBoundingClientRect();
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
  
  setTimeout(() => tooltip.style.opacity = '1', 10);
  
  event.target._tooltip = tooltip;
}

function hideTooltip(event) {
  if (event.target._tooltip) {
    event.target._tooltip.remove();
    delete event.target._tooltip;
  }
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
  document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + 1 for accounts
    if ((event.ctrlKey || event.metaKey) && event.key === '1') {
      event.preventDefault();
      document.getElementById('fetchAccounts').click();
    }
    
    // Ctrl/Cmd + 2 for transactions
    if ((event.ctrlKey || event.metaKey) && event.key === '2') {
      event.preventDefault();
      document.getElementById('fetchTransactions').click();
    }
    
    // Escape to clear data
    if (event.key === 'Escape') {
      document.getElementById('accountsResult').innerHTML = `
        <div class="empty-state">
          <i class="fas fa-wallet"></i>
          <p>Click to load your accounts</p>
        </div>
      `;
      document.getElementById('transactionsResult').innerHTML = `
        <div class="empty-state">
          <i class="fas fa-exchange-alt"></i>
          <p>Click to load your transactions</p>
        </div>
      `;
    }
  });
}

// Add performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }, 0);
    });
  }
}

trackPerformance();
