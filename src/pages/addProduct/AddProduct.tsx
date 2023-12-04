import { Paths, translate, useState } from '../../utilities/commonImports';
import { Input } from '../../components/common/componentsImports';
import { IFieldType } from '../../utilities/interface';
import { Link, useLocation } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { ProductCategory, ProductSubCategory } from '../../utilities/enum';

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
	},
	{
		labelText: 'product.discount',
		labelFor: 'discount',
		id: 'discount',
		name: 'discount',
		type: 'number',
		placeholder: 'product.discount',
	},
	{
		labelText: 'product.brand',
		labelFor: 'brand',
		id: 'brand',
		name: 'brand',
		type: 'text',
		isRequired: true,
		placeholder: 'product.brand',
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
	{
		labelText: 'product.subcategory',
		labelFor: 'subcategory',
		id: 'subcategory',
		name: 'subcategory',
		type: 'text',
		isRequired: true,
		placeholder: 'product.subcategory',
		selectOptions: Object.values(ProductSubCategory),
	},
	{
		labelText: 'product.category',
		labelFor: 'category',
		id: 'category',
		name: 'category',
		type: 'text',
		isRequired: true,
		placeholder: 'product.category',
		selectOptions: Object.values(ProductCategory),
	},
];

const fieldsState: IFieldType = {};
const AddProduct: React.FC = () => {
	const location = useLocation();
	const [productState, setProductState] = useState<IFieldType>(fieldsState);
	productFields.forEach((field) => {
		fieldsState[field.id] = '';
	});
	const handleChange = () => {};

	const fieldErrors: any = {};

	return (
		<div>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{translate('product.title')}
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full">
					<form className="space-y-4">
						<div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{productFields.map((field) => {
								return (
									<Input
										key={field.id}
										value={productState[field.id]}
										handleChange={handleChange}
										type={field.type}
										labelKey={field.labelText}
										id={field.id}
										selectOptions={field.selectOptions}
									/>
								);
							})}
						</div>
						<div className=" sm:w-1/2 md:w-1/2">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Add product Images
							</label>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
								<div className="text-center">
									<PhotoIcon
										className="mx-auto h-12 w-12 text-gray-300"
										aria-hidden="true"
									/>
									<div className="mt-4 flex text-sm leading-6 text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">
										PNG, JPG, GIF up to 1MB
									</p>
								</div>
							</div>
						</div>
						<div className="text-right my-2">
							<Link
								to={Paths.SIGNUP}
								className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>
								{translate('login.forgotPassword')}
							</Link>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md
							 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6
							  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
							  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{translate('login.title')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
