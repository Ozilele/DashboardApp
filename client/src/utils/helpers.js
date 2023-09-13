const colors = [
  'red',
  'orange',
  'teal',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'cyan',
  'green'
]

export const URL_origin = "http://localhost:8000"

export const pickRandomColor = () => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
}

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({
        data: reader.result,
        name: file.name,
      });
    };
    reader.onerror = (err) => {
      reject(err);
    }
  });
}


export const countriesOptions = [
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'IT', label: 'Italy', phone: '39' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
]