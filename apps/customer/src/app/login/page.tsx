export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center">
      <section className="flex flex-col gap-3 mb-10">
        <p className="text-[1.4rem] text-[var(--color-gray-500)]">
          다시 만나서 반가워요
        </p>
        <h1 className="text-[3.2rem] font-bold leading-[1.3] text-[var(--color-text)]">
          Compasser 로그인
        </h1>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-[1.4rem] font-medium text-[var(--color-gray-700)]"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            className="h-[5.2rem] w-full rounded-[1.2rem] border border-[var(--color-gray-300)] px-4 text-[1.5rem] outline-none transition focus:border-[var(--color-primary)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-[1.4rem] font-medium text-[var(--color-gray-700)]"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="h-[5.2rem] w-full rounded-[1.2rem] border border-[var(--color-gray-300)] px-4 text-[1.5rem] outline-none transition focus:border-[var(--color-primary)]"
          />
        </div>

        <button
          type="button"
          className="mt-4 h-[5.2rem] w-full rounded-[1.2rem] bg-[var(--color-primary)] text-[1.6rem] font-semibold text-white transition active:scale-[0.99]"
        >
          로그인
        </button>
      </section>

      <section className="mt-8 flex items-center justify-center gap-2 text-[1.4rem]">
        <span className="text-[var(--color-gray-500)]">처음이신가요?</span>
        <a
          href="/signup"
          className="font-semibold text-[var(--color-primary)]"
        >
          회원가입
        </a>
      </section>
    </main>
  );
}