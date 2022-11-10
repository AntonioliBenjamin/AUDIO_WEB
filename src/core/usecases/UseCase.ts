export interface UseCase<InputUseCase, OutputUseCase> {
    execute(input: InputUseCase): OutputUseCase | Promise<OutputUseCase>;
}