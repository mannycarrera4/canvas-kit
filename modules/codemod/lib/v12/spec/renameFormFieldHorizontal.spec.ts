import {expectTransformFactory} from './expectTransformFactory';
import transform from '../renameFormFieldHorizontal';
import {stripIndent} from 'common-tags';

const expectTransform = expectTransformFactory(transform);

describe('rename horizontal', () => {
  it('should not change non-canvas imports', () => {
    const input = stripIndent`
            import {TextInput} from '@workday/any-other-package'
            import {TextArea} from './text-area'
            import {FormField} from 'any-other-package'
            <>
                <TextInput hasError={true} />
                <TextArea hasError={true} />
                <FormField hasError={true} />
            </>
        `;

    const expected = stripIndent`
            import {TextInput} from '@workday/any-other-package'
            import {TextArea} from './text-area'
            import {FormField} from 'any-other-package'
            <>
                <TextInput hasError={true} />
                <TextArea hasError={true} />
                <FormField hasError={true} />
            </>
        `;
    expectTransform(input, expected);
  });

  it('should rename orientation horizontal to horizontalStart', () => {
    const input = stripIndent`
        import {TextInput} from '@workday/canvas-kit-preview-react/text-input'
        import {TextArea} from '@workday/canvas-kit-preview-react/text-area'
        import {FormField} from '@workday/canvas-kit-preview-react/form-field'
        <>
            <FormField orientation="horizontal" />
        </>
    `;

    const expected = stripIndent`
        import {TextInput} from '@workday/canvas-kit-preview-react/text-input'
        import {TextArea} from '@workday/canvas-kit-preview-react/text-area'
        import {FormField} from '@workday/canvas-kit-preview-react/form-field'
        <>
            <FormField orientation="horizontalStart" />
        </>
    `;
    expectTransform(input, expected);
  });

  it('should change renamed FormField', () => {
    const input = stripIndent`
        import {FormField as CanvasForm} from '@workday/canvas-kit-preview-react/form-field'

        <>
            <CanvasForm orientation="horizontal" />
        </>
    `;

    const expected = stripIndent`
        import {FormField as CanvasForm} from '@workday/canvas-kit-preview-react/form-field'

        <>
            <CanvasForm orientation="horizontalStart" />
        </>
    `;
    expectTransform(input, expected);
  });

  it('should change styled FormField', () => {
    const input = stripIndent`
        import {FormField} from '@workday/canvas-kit-preview-react/form-field'
        const StyledForm = styled(FormField)({color: "#000"});
        <StyledForm orientation="horizontal" />
    `;

    const expected = stripIndent`
        import {FormField} from '@workday/canvas-kit-preview-react/form-field'
        const StyledForm = styled(FormField)({color: "#000"});
        <StyledForm orientation="horizontalStart" />
    `;
    expectTransform(input, expected);
  });
});
