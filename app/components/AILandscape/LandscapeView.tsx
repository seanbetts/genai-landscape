'use client';

import React, { useState, useEffect } from 'react';
import { CategorizedCompanies, LandscapeData, Company, CategoryMap, CompanyCategory } from './types';
import CategorySection from './shared/CategorySection';
import { categoryStyles, containerStyles, headingStyles } from './utils/styles';

interface LandscapeViewProps {
  data: LandscapeData;
  onCompanySelect: (companyId: string) => void;
}

const LandscapeView: React.FC<LandscapeViewProps> = ({ data, onCompanySelect }) => {
  // State for animations when components mount
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set loaded state after component mounts for animation effects
  useEffect(() => {
    // Small delay for animation effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Helper to filter companies with at least one featured model
  const hasFeaturedModel = (company: Company): boolean => {
    return company.models && company.models.some(model => model.featured);
  };

  // Group companies by category (only include those with featured models)
  const categorizedCompanies: CategorizedCompanies = {
    frontier: data.companies.filter(company => company.category === 'frontier' && hasFeaturedModel(company)),
    open: data.companies.filter(company => company.category === 'open' && hasFeaturedModel(company)),
    enterprise: data.companies.filter(company => company.category === 'enterprise' && hasFeaturedModel(company)),
    image: data.companies.filter(company => company.category === 'image' && hasFeaturedModel(company)),
    video: data.companies.filter(company => company.category === 'video' && hasFeaturedModel(company)),
    music: data.companies.filter(company => company.category === 'music' && hasFeaturedModel(company)),
    other: data.companies.filter(company => company.category === 'other' && hasFeaturedModel(company))
  };

  // Category labels with improved naming
  const categoryLabels = {
    frontier: 'Frontier Models',
    open: 'Open Models',
    enterprise: 'Enterprise AI Platforms',
    image: 'Image Generation',
    video: 'Video Generation',
    music: 'Music & Audio Generation',
    other: 'Specialised AI Platforms'
  };
  
  // Get the appropriate category style object
  const getCategoryStyle = (category: CompanyCategory): string => {
    return categoryStyles[category].full;
  };
  
  // Get the appropriate category icon
  const getCategoryIcon = (category: CompanyCategory): string => {
    return categoryStyles[category].icon;
  };
  
  // Get the appropriate category shadow (minimal in new design)
  const getCategoryShadow = (category: CompanyCategory): string => {
    return categoryStyles[category].shadow;
  };

  return (
    <div className={`${containerStyles.landscapeContainer} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {/* Frontier Models Section - Full width with elegant design */}
      <div className={`transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <CategorySection
          title={categoryLabels.frontier}
          companies={categorizedCompanies.frontier}
          styleName={`${getCategoryStyle('frontier')} ${getCategoryShadow('frontier')} ${containerStyles.categorySectionHover}`}
          onCompanySelect={onCompanySelect}
          layout="full-width"
          columns={4}
          icon={getCategoryIcon('frontier')}
        />
      </div>
      
      {/* Two-column layout for Open Models and Enterprise Platforms with staggered animation */}
      <div className={`${containerStyles.landscapeRowTwo} transform transition-all duration-500 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {/* Open Models */}
        <CategorySection
          title={categoryLabels.open}
          companies={categorizedCompanies.open}
          styleName={`${getCategoryStyle('open')} ${getCategoryShadow('open')} ${containerStyles.categorySectionHover}`}
          onCompanySelect={onCompanySelect}
          layout="half-width"
          columns={4}
          icon={getCategoryIcon('open')}
        />
        
        {/* Enterprise Platforms */}
        <CategorySection
          title={categoryLabels.enterprise}
          companies={categorizedCompanies.enterprise}
          styleName={`${getCategoryStyle('enterprise')} ${getCategoryShadow('enterprise')} ${containerStyles.categorySectionHover}`}
          onCompanySelect={onCompanySelect}
          layout="quarter-width"
          icon={getCategoryIcon('enterprise')}
        />
      </div>
      
      {/* Four-column layout for specialized categories with staggered animations */}
      <div className={`${containerStyles.landscapeRowFour} transform transition-all duration-500 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {/* Image */}
        <CategorySection
          title={categoryLabels.image}
          companies={categorizedCompanies.image}
          styleName={`${getCategoryStyle('image')} ${getCategoryShadow('image')} ${containerStyles.categorySectionHover}`}
          onCompanySelect={onCompanySelect}
          layout="quarter-width"
          icon={getCategoryIcon('image')}
        />
        
        {/* Video */}
        <CategorySection
          title={categoryLabels.video}
          companies={categorizedCompanies.video}
          styleName={`${getCategoryStyle('video')} ${getCategoryShadow('video')} ${containerStyles.categorySectionHover}`}
          onCompanySelect={onCompanySelect}
          layout="quarter-width"
          icon={getCategoryIcon('video')}
        />
        
        {/* Music */}
        <CategorySection
          title={categoryLabels.music}
          companies={categorizedCompanies.music}
          styleName={`${getCategoryStyle('music')} ${getCategoryShadow('music')} ${containerStyles.categorySectionHover}`}
          onCompanySelect={onCompanySelect}
          layout="quarter-width"
          icon={getCategoryIcon('music')}
        />
        
        {/* Other */}
        <CategorySection
          title={categoryLabels.other}
          companies={categorizedCompanies.other}
          styleName={`${getCategoryStyle('other')} ${getCategoryShadow('other')} ${containerStyles.categorySectionHover}`}
          onCompanySelect={onCompanySelect}
          layout="quarter-width"
          icon={getCategoryIcon('other')}
        />
      </div>
    </div>
  );
};

export default LandscapeView;