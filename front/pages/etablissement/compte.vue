<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const data2 = await $fetch(
  "http://localhost:8080/PasserellePro/Serv?op=get_etab_from_token",
  {
    credentials: "include",
  }
);
const establishmentAddress = ref(data2.adresse);
const establishmentSIREN = ref(data2.SIREN);
const establishmentName = ref(data2.nom);
const establishmentDescription = ref(data2.description);
//data2.image : url
const establishmentImage = ref(data2.image);
const estEntreprise = ref(data2.entreprise);

const loading = ref(false);
const route = useRoute();

async function saveChanges() {
  loading.value = true;
  const data = await $fetch(
    "http://localhost:8080/PasserellePro/Serv?op=modifier_etablissement",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SIREN: establishmentSIREN.value,
        nom: establishmentName.value,
        adresse: establishmentAddress.value,
        entreprise: estEntreprise.value,
        description: establishmentDescription.value,
        image: establishmentImage.value,
      }),
      credentials: "include",
    }
  );
  console.log(data);
  if (data ==  "Modifier"){
  toast({
    title: "Succès",
    description: "Les modifications ont été enregistrées avec succès",
  });
  } else {
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de l'enregistrement des modifications",
    });
  }
  loading.value = false;
}
</script>

<template>
  <div>
    <Titre
      title="Informations de votre établissement"
      subtitle="Modifier les informations de l'établissement"
    />
    <div class="grid gap-4 px-4">
      <div class="grid gap-3">
        <Label for="establishmentName">Nom de l'établissement</Label>
        <Input id="establishmentName" type="text" v-model="establishmentName" />
      </div>
      <div class="grid gap-3">
        <Label for="establishmentAddress">Adresse de l'établissement</Label>
        <Input
          id="establishmentAddress"
          type="text"
          v-model="establishmentAddress"
        />
      </div>
      <div class="grid gap-3">
        <Label for="establishmentSIREN"
          >SIREN de l'établissement</Label
        >
        <Input
          id="establishmentSIREN"
          type="text"
          disabled
          v-model="establishmentSIREN"
        />
      </div>
      <div class="grid gap-3">
        <Label for="establishmentDescription"
          >Description de l'établissement</Label
        >
        <Textarea
          id="establishmentDescription"
          v-model="establishmentDescription"
        />
      </div>
      <div class="grid gap-3 mb-2">
        <Label for="establishmentImage">Image de l'établissement</Label>
        <Input
          id="establishmentImage"
          type="text"
          v-model="establishmentImage"
        />
      </div>
      <div class="gap-3 mb-2 flex flex-row">
        <Switch v-model:checked="estEntreprise" />
        <div class="flex" v-if="estEntreprise">
          L'établissement est scolaire
        </div>
        <div class="flex" v-else>
          L'établissement est une entreprise / association
        </div>
      </div>
      <Button @click="saveChanges">
        <div v-if="!loading" class="flex items-center space-x-2">
          Enregistrer les modifications
        </div>
        <div v-else class="py-2" role="status">
          <svg
            aria-hidden="true"
            class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary/95"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </Button>
    </div>
  </div>
</template>
