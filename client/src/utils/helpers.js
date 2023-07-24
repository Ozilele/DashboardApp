

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