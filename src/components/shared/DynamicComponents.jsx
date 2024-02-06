export default function DynamicComponents ({
filter,
listComponent,
args,    
}) {
const DynamicComponent = listComponent[filter];

return (
    <DynamicComponent
    filter={filter}
    {...args}
    />
);
};