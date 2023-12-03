import { translate, useState } from '../../utilities/commonImports';
import {
	MailOutlineIcon,
	PasswordIcon,
	VisibilityIcon,
} from '../../utilities/imageLogoImports';
import { Input } from '../../components/common/componentsImports';
import { IFieldType } from '../../utilities/interface';

const productFields = [
	{
		labelText: 'product.name',
		labelFor: 'name',
		id: 'name',
		name: 'name',
		type: 'text',
		autoFocus: true,
		isRequired: true,
		placeholder: 'product.name',
	},
	{
		labelText: 'product.description',
		labelFor: 'description',
		id: 'description',
		name: 'description',
		type: 'text',
		isRequired: true,
		placeholder: 'product.description',
	},
	{
		labelText: 'product.price',
		labelFor: 'price',
		id: 'price',
		name: 'price',
		type: 'number',
		autoFocus: true,
		isRequired: true,
		placeholder: 'product.price',
	},
	{
		labelText: 'product.discount',
		labelFor: 'discount',
		id: 'discount',
		name: 'discount',
		type: 'number',
		placeholder: 'product.discount',
		icon: MailOutlineIcon,
	},
	{
		labelText: 'product.brand',
		labelFor: 'brand',
		id: 'brand',
		name: 'brand',
		type: 'text',
		isRequired: true,
		placeholder: 'product.brand',
		icon: PasswordIcon,
		endLineIcon: VisibilityIcon,
	},
	{
		labelText: 'product.quantity',
		labelFor: 'quantity',
		id: 'quantity',
		name: 'quantity',
		type: 'number',
		isRequired: true,
		placeholder: 'product.quantity',
	},
];

const fieldsState: IFieldType = {};
const AddProduct: React.FC = () => {
	const [productState, setProductState] = useState<IFieldType>(fieldsState);
	productFields.forEach((field) => {
		fieldsState[field.id] = '';
	});
	const handleChange = () => {};

	return (
		<div>
			{/* <h2>{translate('Add a product')}</h2>
			<form>
				{productFields.map((field) => {
					return (
						<Input
							key={field.id}
							handleChange={handleChange}
							value={fieldsState[field.id]}
							labelText={translate(field.labelText)}
							labelFor={field.labelFor}
							id={field.id}
							name={field.name}
							placeholder={translate(field.placeholder)}
							customClass="bg-transparent w-1/2 d-flex"
						/>
					);
				})}
			</form> */}
		</div>
	);
};

export default AddProduct;
