<FormControl>
                <FormLabel htmlFor="quantidade">Quantidade Nova:</FormLabel>
                <TextField
                  autoComplete="quantidade"
                  name="quantidade"
                  required
                  fullWidth
                  id="quantidade"
                  placeholder="XXXXXXXXXXXX"
                  value={formData.quantidade}
                  onChange={handleChange}
                />
              </FormControl>