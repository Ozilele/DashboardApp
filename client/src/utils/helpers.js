

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