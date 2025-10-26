'use client';
import InputComponent from "@/components/atoms/inputComponent";
import Button from "@/components/atoms/buttonComponent";
import { useCreateSellerProfile } from "@/hooks/useCreateSellerProfile";
import { CreateSellerProfileFormValues } from "@/interfaces/sellerInterface"; 
import { MapPin } from 'lucide-react'; 

export default function CreateSellerProfileForm() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useCreateSellerProfile();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create your seller profile</h2>
      <p className="text-gray-600 mb-6">
        You can update your profile any time in your account settings. Buyers will only see your name, city, and state.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Display Name */}
        <InputComponent<CreateSellerProfileFormValues>
          label="How do you want to be known on Reverb?"
          idElement="displayName"
          name="displayName"
          placeholder="Kore's Shop"
          register={register}
          className={errors.displayName ? "border-red-500" : ""}
        />
        {errors.displayName && (
          <p className="text-red-500 text-sm mt-1">{errors.displayName.message}</p>
        )}
        <p className="text-gray-500 text-sm -mt-4">How your profile will appear to buyers</p>

        {/* City (simplificado de Street Address) */}
        <InputComponent<CreateSellerProfileFormValues>
          label="City"
          idElement="city"
          name="city"
          typeElement="text"
          placeholder="Ej: Madrid"
          iconLeft={<MapPin size={20} />}
          register={register}
          className={errors.city ? "border-red-500" : ""}
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}

        {/* Checkbox de Términos y Condiciones */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="acceptTerms"
            {...register("acceptTerms")}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
            I accept the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm -mt-4">{errors.acceptTerms.message}</p>
        )}

        {/* Botón de continuar */}
        <Button
          type="submit"
          fullWidth
          variant="dark"
          disabled={isSubmitting}
          className="mt-8"
        >
          {isSubmitting ? 'Creating Profile...' : 'Continue'}
        </Button>
      </form>
    </div>
  );
}