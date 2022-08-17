import React from 'react';

interface LaunchImageProps {
  icon: string | null,
  className?: string
}
const LaunchImage = ({ icon, className }: LaunchImageProps) => {
  if (icon) return <img className={className} src={icon} alt={'launch patch'}/>;
  else
    return <span className={className}>🚀</span>;
};

export default LaunchImage;
