'use client';

import React from 'react';
import Image from 'next/image';
import { Company, Model } from '../types';
import { textStyles } from '../utils/styles';

interface CompanyCardProps {
  company: Company;
  onClick: (companyId: string) => void;
  showModelCount?: number;
  imageSize?: { width: number; height: number };
}

const CompanyCard: React.FC<CompanyCardProps> = ({ 
  company, 
  onClick, 
  showModelCount = 1,
  imageSize = { width: 100, height: 40 }
}) => {
  const featuredModels = company.models.filter(model => model.featured);
  
  return (
    <div 
      key={company.id} 
      className="flex flex-col items-center cursor-pointer hover:opacity-80"
      onClick={() => onClick(company.id)}
    >
      <div className="relative h-10 w-full mb-2">
        <Image 
          src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
          alt={`${company.name} logo`}
          className="mx-auto"
          width={imageSize.width}
          height={imageSize.height}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="text-center">
        {featuredModels.slice(0, showModelCount).map((model, idx) => (
          <div key={model.id} className={`text-sm font-medium ${textStyles.primary}`}>
            {showModelCount > 1 && idx > 0 ? `& ${model.name}` : model.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCard;