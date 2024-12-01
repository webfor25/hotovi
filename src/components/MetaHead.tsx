import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaHeadProps {
  title?: string;
  description: string;
}

export const MetaHead: React.FC<MetaHeadProps> = ({ 
  title = '1HourHusband - Find Professional Services',
  description 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};