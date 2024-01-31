import { Merchi } from '../merchi';
test('can make ThemeCssSetting', function () {
    var merchi = new Merchi();
    var themeCssSetting = new merchi.ThemeCssSetting();
    expect(themeCssSetting).toBeTruthy();
});
