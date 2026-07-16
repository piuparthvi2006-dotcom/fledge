import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import Navbar from '../components/Navbar';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityDataState from '../components/OpportunityDataState';
import { CATEGORIES } from '../data/opportunityFilters';
import { useOpportunities } from '../hooks/useOpportunities';
import {
  isExpiredOpportunityRetained,
  isOpportunityExpired,
} from '../utils/formatOpportunity';

export default function Saved() {
  const {
    clearSaved,
    error,
    isLoading,
    refresh,
    savedOpportunities: databaseSavedOpportunities,
    toggleSaved,
    user,
  } = useOpportunities();
  const [activeCategories, setActiveCategories] = useState([]);
  const [sortBy, setSortBy] = useState('deadline');
  const [actionError, setActionError] = useState('');

  const savedOpportunities = useMemo(
    () => databaseSavedOpportunities.filter(opportunity => (
      !isOpportunityExpired(opportunity)
      || isExpiredOpportunityRetained(opportunity)
    )),
    [databaseSavedOpportunities]
  );

  const counts = useMemo(() => {
    const result = { all: savedOpportunities.length };
    savedOpportunities.forEach(opportunity => {
      result[opportunity.category] = (result[opportunity.category] || 0) + 1;
    });
    return result;
  }, [savedOpportunities]);

  const filtered = useMemo(() => {
    let results = savedOpportunities;
    if (activeCategories.length > 0) {
      results = results.filter(opportunity => (
        activeCategories.includes(opportunity.category)
      ));
    }

    if (sortBy === 'deadline') {
      return [...results].sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    }

    return [...results].sort((a, b) => a.title.localeCompare(b.title));
  }, [activeCategories, savedOpportunities, sortBy]);

  const visibleCategories = CATEGORIES.filter(
    category => category.key === 'all' || counts[category.key] > 0
  );

  function toggleCategory(key) {
    if (key === 'all') {
      setActiveCategories([]);
      return;
    }

    setActiveCategories(current => (
      current.includes(key)
        ? current.filter(category => category !== key)
        : [...current, key]
    ));
  }

  async function removeBookmark(id) {
    setActionError('');
    try {
      await toggleSaved(id);
    } catch (removeError) {
      setActionError(removeError.message);
    }
  }

  async function handleClearAll() {
    setActionError('');
    try {
      await clearSaved();
    } catch (clearError) {
      setActionError(clearError.message);
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F5F2ED', color: '#1a1a18', minHeight: '100vh' }}>
      <Navbar activePage="Saved" />

      <div style={{ padding: '40px 48px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, marginBottom: '6px' }}>
            Saved Opportunities
          </h1>
          <p style={{ fontSize: '15px', color: '#6e6e64' }}>
            {savedOpportunities.length} opportunities bookmarked
          </p>
        </div>
        {user && savedOpportunities.length > 0 && (
          <button onClick={handleClearAll} style={clearButtonStyle} type="button">
            Clear all
          </button>
        )}
      </div>

      {actionError && (
        <div role="alert" style={{ color: '#9A3510', fontSize: '13px', padding: '0 48px 14px' }}>
          {actionError}
        </div>
      )}

      {isLoading || error ? (
        <OpportunityDataState error={error} isLoading={isLoading} onRetry={refresh} />
      ) : !user ? (
        <div style={emptyStateStyle}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
            Log in to view saved opportunities
          </div>
          <Link to="/login" style={loginLinkStyle}>Log in</Link>
        </div>
      ) : savedOpportunities.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
            Nothing saved yet
          </div>
          <p style={{ fontSize: '14px', color: '#9a9a8a', marginBottom: '24px' }}>
            Bookmark opportunities on Explore to find them here later.
          </p>
          <Link to="/explore" style={loginLinkStyle}>Explore opportunities</Link>
        </div>
      ) : (
        <>
          <FilterBar
            activeCategories={activeCategories}
            categories={visibleCategories}
            counts={counts}
            onToggle={toggleCategory}
          />

          <div style={{ padding: '0 48px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#6a6a62' }}>
              Showing {filtered.length} of {savedOpportunities.length} saved opportunities
            </span>
            <select onChange={event => setSortBy(event.target.value)} value={sortBy} style={sortStyle}>
              <option value="deadline">Sort by: Deadline</option>
              <option value="title">Sort by: Title</option>
            </select>
          </div>

          <div style={{ padding: '0 48px 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {filtered.map(opportunity => (
              <OpportunityCard
                isBookmarked={true}
                key={opportunity.id}
                onBookmark={removeBookmark}
                opportunity={opportunity}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const clearButtonStyle = {
  background: 'white',
  border: '1.5px solid #C94F1A',
  borderRadius: '20px',
  color: '#C94F1A',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  fontWeight: 500,
  padding: '8px 18px',
};

const emptyStateStyle = { padding: '80px 48px', textAlign: 'center' };

const loginLinkStyle = {
  background: '#C94F1A',
  borderRadius: '6px',
  color: '#FFFFFF',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: 600,
  padding: '9px 15px',
  textDecoration: 'none',
};

const sortStyle = {
  background: '#ffffff',
  border: '2px solid #C4BDB5',
  borderRadius: '8px',
  color: '#1a1a18',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  outline: 'none',
  padding: '6px 10px',
};
