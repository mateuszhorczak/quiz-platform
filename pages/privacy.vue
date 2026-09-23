<script setup lang="ts">
const { registrationEnabled, contactEmail } = useRuntimeConfig().public

useHead({ title: 'Prywatność' })
</script>

<template>
  <MoleculesMainHeading
      text="Prywatność i pliki cookie"
      icon="i-mdi-shield-account-outline"
  />
  <LayoutsMainContainer>
    <div class="space-y-6">
      <section class="space-y-2">
        <AtomsSubHeading>Kto prowadzi stronę</AtomsSubHeading>
        <AtomsParagraph>
          Strona jest niekomercyjnym projektem hobbystycznym / portfolio prowadzonym przez Mateusza Horczaka
          (administrator danych).
          Kontakt:
          <a v-if="contactEmail" :href="`mailto:${contactEmail}`" class="underline">{{ contactEmail }}</a>
          <a v-else href="https://github.com/mateuszhorczak/quiz-platform/issues" target="_blank" class="underline">
            zgłoszenie w repozytorium na GitHubie
          </a>.
        </AtomsParagraph>
      </section>

      <section class="space-y-2">
        <AtomsSubHeading>Rozwiązywanie quizów</AtomsSubHeading>
        <AtomsParagraph>
          Quizy można rozwiązywać bez konta. Odpowiedzi są sprawdzane na serwerze i nie są zapisywane
          ani powiązane z Twoją osobą.
        </AtomsParagraph>
      </section>

      <section v-if="registrationEnabled" class="space-y-2">
        <AtomsSubHeading>Konto użytkownika</AtomsSubHeading>
        <AtomsParagraph>
          Przy zakładaniu konta zapisywane są wyłącznie: nazwa użytkownika (może być pseudonimem),
          skrót hasła (samego hasła nie przechowujemy) oraz data utworzenia konta, a także quizy, które utworzysz.
          Nie zbieramy adresu e-mail ani innych danych. Dane przetwarzane są w celu świadczenia usługi
          (art. 6 ust. 1 lit. b RODO) do czasu usunięcia konta. Konto usuniesz, pisząc na kontakt podany wyżej.
        </AtomsParagraph>
        <AtomsParagraph>
          Quizy, które utworzysz, są publicznie widoczne dla wszystkich odwiedzających. Nie umieszczaj w nich
          danych osobowych ani treści, do których nie masz praw.
        </AtomsParagraph>
      </section>

      <section class="space-y-2">
        <AtomsSubHeading>Hosting i logi</AtomsSubHeading>
        <AtomsParagraph>
          Strona działa na infrastrukturze Netlify, a dane quizów przechowywane są w bazie Turso.
          Dostawca hostingu może automatycznie zapisywać techniczne logi serwera (m.in. adres IP, datę
          żądania, typ przeglądarki) w celu zapewnienia bezpieczeństwa i działania usługi
          (art. 6 ust. 1 lit. f RODO). Dostawcy ci mogą przetwarzać dane poza EOG na podstawie
          standardowych klauzul umownych lub EU-US Data Privacy Framework.
        </AtomsParagraph>
      </section>

      <section class="space-y-2">
        <AtomsSubHeading>Pliki cookie</AtomsSubHeading>
        <AtomsParagraph>
          Strona nie używa cookie analitycznych, reklamowych ani śledzących. Używane są wyłącznie niezbędne
          cookie funkcjonalne:
        </AtomsParagraph>
        <ul class="list-disc pl-6 text-black dark:text-white">
          <li><code>auth:token</code>, <code>auth:user</code> – utrzymanie zalogowania (tylko po zalogowaniu, 24 h)</li>
          <li><code>settings:allQuestionInQuiz</code> – zapamiętanie ustawienia z zakładki Settings</li>
        </ul>
      </section>

      <section class="space-y-2">
        <AtomsSubHeading>Twoje prawa</AtomsSubHeading>
        <AtomsParagraph>
          Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
          wniesienia sprzeciwu oraz skargi do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl).
        </AtomsParagraph>
      </section>
    </div>
  </LayoutsMainContainer>
</template>
