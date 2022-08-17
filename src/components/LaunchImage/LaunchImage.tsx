import React from 'react';

interface LaunchImageProps {
  icon: string | null,
  className?: string
}
const LaunchImage = ({ icon, className }: LaunchImageProps) => {
  return icon ? <img className={className} src={icon} alt={'launch patch'}/> :
    <span className={className}>🚀</span>;
};

export default LaunchImage;
